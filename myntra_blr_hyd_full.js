/*****************************************************
 * ZIPPEE – SASA ANALYTICS (BLR + HYD)
 * PART 1: GLOBAL CONFIG + LIVE PROJECTION FETCH
 *****************************************************/

function zippeeToggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks) navLinks.classList.toggle("active");
}

function getLatestAvailableData(dateStr) {
  const target = new Date(dateStr);

  // sirf PAST ya SAME date allow
  const valid = reportData.filter(r => {
    const d = new Date(r.date);
    return d <= target;
  });

  // agar kuch nahi mila → first row fallback
  if (!valid.length) return reportData[0];

  // latest past date
  return valid[valid.length - 1];
}



// Hour
function getHourPercentageFor(dayName, hour) {
  const start = hour % 12 || 12;
  const end = (hour + 1) % 12 || 12;
  const label = `${start}-${end}`;

  const row = hourPercentages.find(h => h.hour === label);

  if (!row) {
    return { label, percent: 0 };
  }

  return {
    label,
    percent: row[dayName] || 0
  };
}


/* =========================
   CITY → STORE MAPPING
========================= */
const STORE_ORDER = [
  "kalyan nagar mnow",
  "basaveshwar nagar mnow",
  "jakkur mnow",
  "begur mnow",
  "thyagaraja nagar mnow",
  "brookfield mnow",
  "hulimavu mnow",
  "sarjapur road mnow",
  "manikonda mnow",
  "gachibowli mnow",
  "attapur mnow",
  "nizampet mnow"
];

const CITY_STORES = {
  bangalore: STORE_ORDER.slice(0, 8),
  hyderabad: STORE_ORDER.slice(8)
};

const ALL_STORES = STORE_ORDER;

/* =========================
   GLOBAL STATE
========================= */

let reportData = [];
let lastSummaryHTML = "";
let lastProjectionHTML = "";

let selectedDateTime = null; // null = live mode
let activeProjectionData = null; 
let blrDeepPain = [];
let hydDeepPain = [];

let blrDeepPainDetails = [];
let hydDeepPainDetails = [];


/* =========================
   GOOGLE SHEET (LIVE)
========================= */

const PROJECTION_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9TO8jCWfO7hdQXF5vmwdOj7-VnsTZ-gtSGVfeO2ZepA6Za23hS2P7eCZUKX5vZBl6nWUexc5sPny5/pub?gid=0&single=true&output=csv";

/* =========================
   LIVE PROJECTION FETCH
   (B → M : 12 STORES)
========================= */

function loadLiveProjections() {
  fetch(PROJECTION_CSV_URL)
    .then(res => res.text())
    .then(csvText => {
      const workbook = XLSX.read(csvText, { type: "string" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { raw: false });

      reportData = rows.map(row => {
        const firstKey = Object.keys(row)[0];
        const dateStr = row[firstKey]; // DD/MM/YYYY
        if (!dateStr) return null;

        const [dd, mm, yyyy] = dateStr.split("/");
        const dateObj = new Date(`${yyyy}-${mm}-${dd}`);

        const storeColumns = Object.keys(row).slice(1, 13); // B → M

        const stores = {};
        let total = 0;

        storeColumns.forEach(col => {
          const normalized = col
  .trim()
  .toLowerCase()
  .replace(/_/g, " ")
  .replace(/\s+/g, " ")
  .replace(" mnow", " mnow");
          if (!ALL_STORES.includes(normalized)) return;

          const val = Number(row[col]) || 0;
          stores[normalized] = val;
          total += val;
        });

        return {
          day: getDayName(dateObj),
          date: `${parseInt(mm)}/${parseInt(dd)}/${yyyy}`,
          stores,
          total
        };
      }).filter(Boolean);

      generateSummaryTable();
    })
    .catch(err => {
      console.error("Projection fetch failed:", err);
      alert("Failed to load live projections");
    });
}

/* =========================
   DATE HELPERS
========================= */

function getDayName(date) {
  return [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ][date.getDay()];
}

function getTodayDateString() {
  const today = new Date();
  return `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
}

function getEffectiveDateTime() {
  return selectedDateTime ? new Date(selectedDateTime) : new Date();
}

function updateCurrentDateHeader() {
  const el = document.getElementById("currentDate");
  if (!el || !activeProjectionData) return;

  el.textContent = activeProjectionData.date;
}


function updateDateTime() {
  const el = document.getElementById("datetime");
  if (el) el.textContent = new Date().toLocaleString();
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  loadLiveProjections();
  updateCurrentDateHeader();
  updateDateTime();

setInterval(() => {
  if (!selectedDateTime) {   // ✅ sirf live mode me
    loadLiveProjections();
    updateCurrentDateHeader();
    updateDateTime();
  }
}, 60 * 1000);

});
function getEffectiveHour() {
  const dt = getEffectiveDateTime();
  let h = dt.getHours();

  if (h < 6) h = 6;
  if (h > 23) h = 23;

  return h;
}


/*****************************************************
 * PART 2: HOUR % LOGIC + PROJECTION TABLE
 *****************************************************/

/* =========================
   HOUR-WISE % DATA
========================= */

const hourPercentages = [
  { hour: "6-7",   Sunday: 0,  Monday: 0,  Tuesday: 0,  Wednesday: 0,  Thursday: 0,  Friday: 0,  Saturday: 0 },
  { hour: "7-8",   Sunday: 0.59,  Monday: 0.74,  Tuesday: 1.09,  Wednesday: 0.84,  Thursday: 0.93,  Friday: 1.09,  Saturday: 0.51 },
  { hour: "8-9",   Sunday: 2.60,  Monday: 2.93,  Tuesday: 3.81,  Wednesday: 3.55,  Thursday: 3.12,  Friday: 3.94,  Saturday: 1.81 },
  { hour: "9-10",  Sunday: 6.57,  Monday: 6.69,  Tuesday: 8.39,  Wednesday: 7.96,  Thursday: 8.11,  Friday: 7.88,  Saturday: 10.88 },
  { hour: "10-11", Sunday: 11.02, Monday: 11.35, Tuesday: 13.94, Wednesday: 13.44, Thursday: 13.48, Friday: 13.51, Saturday: 10.88 },
  { hour: "11-12", Sunday: 18.11, Monday: 16.81, Tuesday: 20.44, Wednesday: 20.15, Thursday: 21.58, Friday: 19.74, Saturday: 16.98 },
  { hour: "12-13", Sunday: 25.91, Monday: 24.03, Tuesday: 25.81, Wednesday: 26.66, Thursday: 29.73, Friday: 26.46, Saturday: 24.20 },
  { hour: "13-14", Sunday: 34.54, Monday: 31.10, Tuesday: 33.87, Wednesday: 32.85, Thursday: 36.84, Friday: 33.57, Saturday: 32.05 },
  { hour: "14-15", Sunday: 42.45, Monday: 37.18, Tuesday: 40.87, Wednesday: 38.63, Thursday: 43.05, Friday: 40.94, Saturday: 39.64 },
  { hour: "15-16", Sunday: 49.51, Monday: 44.34, Tuesday: 48.07, Wednesday: 44.64, Thursday: 51.02, Friday: 47.14, Saturday: 46.64 },
  { hour: "16-17", Sunday: 56.64, Monday: 51.31, Tuesday: 54.30, Wednesday: 50.99, Thursday: 58.56, Friday: 54.00, Saturday: 53.89 },
  { hour: "17-18", Sunday: 64.01, Monday: 57.76, Tuesday: 60.18, Wednesday: 58.48, Thursday: 65.94, Friday: 60.02, Saturday: 61.95 },
  { hour: "18-19", Sunday: 71.58, Monday: 65.32, Tuesday: 65.94, Wednesday: 66.58, Thursday: 72.89, Friday: 67.99, Saturday: 68.59 },
  { hour: "19-20", Sunday: 79.43, Monday: 72.97, Tuesday: 73.41, Wednesday: 74.25, Thursday: 79.41, Friday: 75.25, Saturday: 76.08 },
  { hour: "20-21", Sunday: 86.38, Monday: 80.87, Tuesday: 81.12, Wednesday: 81.05, Thursday: 85.75, Friday: 82.96, Saturday: 83.23 },
  { hour: "21-22", Sunday: 90.74, Monday: 87.60, Tuesday: 88.18, Wednesday: 89.10, Thursday: 90.90, Friday: 89.70, Saturday: 89.63 },
  { hour: "22-23", Sunday: 96.10, Monday: 95.01, Tuesday: 95.92, Wednesday: 95.15, Thursday: 95.73, Friday: 95.48, Saturday: 95.66 },
  { hour: "23-24", Sunday: 100.0, Monday: 100.0, Tuesday: 100.0, Wednesday: 100.0, Thursday: 100.0, Friday: 100.0, Saturday: 100.0 },
];
function getTodayCumulativePercentage(dayName, hour) {
  const row = hourPercentages.find(h => {
    const [start] = h.hour.split("-").map(Number);
    return start === hour;
  });

  return row ? (row[dayName] || 0) : 0;
}
function mapToProjectionHour(h) {
  if (h >= 6 && h < 12) return h;        // 6–11 AM
  if (h >= 12 && h < 18) return h - 12; // 12–5 PM → 12,1,2,3,4,5
  if (h >= 18 && h <= 23) return h - 12; // 6–11 PM → 6,7,8,9,10,11
  return 6;
}


/* =========================
   GET % FOR DAY + HOUR
========================= */
function getCumulativeHourLabel(endHour) {
  const startHour = 6;

  const format = h => {
    const hour12 = h % 12 || 12;
    const suffix = h < 12 ? "AM" : "PM";
    return `${hour12} ${suffix}`;
  };

  return `${format(startHour)} – ${format(endHour)}`;
}

function getProjectionForStore(storeName) {
  if (!activeProjectionData || !activeProjectionData.stores) {
    return { fullDay: 0, till: 0, buffer: 0 };
  }

  const fullDay = activeProjectionData.stores[storeName] || 0;

const effectiveDT = getEffectiveDateTime();
const day = getDayName(effectiveDT);
const hour = effectiveDT.getHours();

const cumulativePercent = getTodayCumulativePercentage(day, hour);

const till = Math.round(fullDay * (cumulativePercent / 100));
const buffer = Math.round(till * 1.15);

  return { fullDay, till, buffer };
}

/* =========================
   PROJECTION TABLE
========================= */

function generateSummaryTable() {
  if (!reportData.length) return;

  const tableBody = document.querySelector("#reportTable tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";

  // 1️⃣ Correct date data
  const d = selectedDateTime ? new Date(selectedDateTime) : new Date();
  const key = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  const data = getLatestAvailableData(key);

  activeProjectionData = data;
  // 🔥 Update header date dynamically
const [mm, dd, yyyy] = data.date.split("/");
document.getElementById("currentDate").textContent = `${dd}/${mm}/${yyyy}`;


  // 2️⃣ Time + cumulative %
  const now = getEffectiveDateTime();
  const day = getDayName(now);
  const hour = getEffectiveHour();
  const cumulativePercent = getTodayCumulativePercentage(day, hour);

  // (label optional, numbers pe koi effect nahi)
  const label = getCumulativeHourLabel(hour);
const hour12 = hour % 12 || 12;
const suffix = hour < 12 ? "AM" : "PM";
const simpleLabel = `${hour12} ${suffix}`;

document.getElementById("tillHourMain").textContent = simpleLabel;
document.getElementById("tillHourBuffer").textContent = simpleLabel;


  // 3️⃣ Build rows (REAL cumulative)
  let totalFull = 0;
  let totalTill = 0;
  let totalBuffer = 0;

  ALL_STORES.forEach(store => {
    if (!(store in data.stores)) return;

    const fullDay = data.stores[store] || 0;
    const tillNow = Math.round(fullDay * (cumulativePercent / 100));
    const buffer = Math.round(tillNow * 1.15);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatStoreName(store)}</td>
      <td>${fullDay}</td>
      <td>${tillNow}</td>
      <td>${buffer}</td>
    `;
    tableBody.appendChild(tr);

    totalFull += fullDay;
    totalTill += tillNow;
    totalBuffer += buffer;
  });

  // 4️⃣ Total row
  const totalRow = document.createElement("tr");
  totalRow.style.fontWeight = "bold";
  totalRow.style.background = "#0078FF";
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalFull}</td>
    <td>${totalTill}</td>
    <td>${totalBuffer}</td>
  `;
  tableBody.appendChild(totalRow);

  lastProjectionHTML = document.getElementById("reportTable").outerHTML;
}


/*****************************************************
 * PART 3: EXCEL UPLOAD + SUMMARY + FINAL SPLIT TABLE
 *****************************************************/

/* =========================
   GLOBAL HOLDERS
========================= */

/* =========================
   FILE UPLOAD HANDLER
========================= */

function processFile() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please upload Excel / CSV file");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    let workbook;
    if (file.name.endsWith(".csv")) {
      workbook = XLSX.read(e.target.result, { type: "string" });
    } else {
      workbook = XLSX.read(new Uint8Array(e.target.result), { type: "array" });
    }

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const fileData = XLSX.utils.sheet_to_json(sheet);

    aggregateOrders(fileData);
  };

  file.name.endsWith(".csv")
    ? reader.readAsText(file)
    : reader.readAsArrayBuffer(file);
}

/* =========================
   AGGREGATION LOGIC
========================= */

function aggregateOrders(data) {
  let storeOrders = {};
  let delivered = {};
  let attempted = {};
  let cancelled = {};
  let deepPain = {};

  data.forEach(row => {
    let store = (row["Store Name"] || "")
      .trim()
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\s+/g, " ");

    if (!ALL_STORES.includes(store)) return;

    let status = (row["Order Status"] || "").toLowerCase();
    let breached = (row["Breached"] || "").toLowerCase();
    let breachMin = Number(row["Breached Duration (In Min)"]) || 0;

    storeOrders[store] = (storeOrders[store] || 0) + 1;

    if (status === "delivered") {
      delivered[store] = (delivered[store] || 0) + 1;
      if (breached === "yes" && breachMin > 15) {
        deepPain[store] = (deepPain[store] || 0) + 1;
      }
    } 
    else if (status === "attempted") {
      attempted[store] = (attempted[store] || 0) + 1;
    } 
    else if (status.includes("cancel")) {
      cancelled[store] = (cancelled[store] || 0) + 1;
    }
  });
  extractDeepPainOrders(data);
  extractDeepPainOrders_details(data);

  generateSummaryPage(
    storeOrders,
    delivered,
    attempted,
    cancelled,
    {},
    deepPain
  );
}



/* =========================
   SUMMARY TABLE
========================= */

function generateSummaryPage(
  storeOrders,
  deliveredOrders,
  attemptedOrders,
  cancelledOrders,
  actualRiders,
  deepPainOrders
) {
  let html = `
  <table class="clean-table" id="summaryTable">
    <thead>
      <tr>
        <th>Store</th>
        <th>Total</th>
        <th>Cancelled</th>
        <th>Cancelled %</th>
        <th>Delivered</th>
        <th>Attempted</th>
        <th>Deep Pain</th>
        <th>Deep Pain %</th>
        <th>Actual Riders</th>
        <th>Idle Rider</th>
        <th>BF</th>
      </tr>
    </thead>
    <tbody>
  `;

  let totals = {
    total: 0,
    cancel: 0,
    deliver: 0,
    attempt: 0,
    deep: 0
  };

STORE_ORDER.forEach(store => {
    const total = storeOrders[store] || 0;
    const cancel = cancelledOrders[store] || 0;
    const deliver = deliveredOrders[store] || 0;
    const attempt = attemptedOrders[store] || 0;
    const deep = deepPainOrders[store] || 0;

    const cancelPct = total ? (((cancel + attempt) / total) * 100).toFixed(2) : "0.00";
    const deepPct = deliver ? ((deep / deliver) * 100).toFixed(2) : "0.00";

    totals.total += total;
    totals.cancel += cancel;
    totals.deliver += deliver;
    totals.attempt += attempt;
    totals.deep += deep;

    html += `
      <tr>
        <td>${store}</td>
        <td>${total}</td>
        <td>${cancel}</td>
        <td>${cancelPct}%</td>
        <td>${deliver}</td>
        <td>${attempt}</td>
        <td>${deep}</td>
        <td>${deepPct}%</td>
        <td><input class="summary-input"></td>
        <td><input class="summary-input"></td>
        <td><input class="summary-input"></td>
      </tr>
    `;
  });

  html += `
    </tbody>
    <tfoot>
      <tr style="font-weight:bold;background:#007bff;color:#fff;">
        <td>Total</td>
        <td>${totals.total}</td>
        <td>${totals.cancel}</td>
        <td></td>
        <td>${totals.deliver}</td>
        <td>${totals.attempt}</td>
        <td>${totals.deep}</td>
        <td></td>
        <td></td><td></td><td></td>
      </tr>
    </tfoot>
  </table>
  `;

  document.getElementById("output").innerHTML = html;
  lastSummaryHTML = html;

  document.getElementById("finalTableBtn").style.display = "inline-block";
  bindFinalTableButton();
}

/* =========================
   FINAL SPLIT TABLE
========================= */

function bindFinalTableButton() {
  const btn = document.getElementById("finalTableBtn");
  if (!btn) return;

  btn.onclick = () => {
    const rows = document.querySelectorAll("#summaryTable tbody tr");
    let blr = [];
    let hyd = [];

    rows.forEach(r => {
      const store = r
        .querySelector("td")
        ?.innerText
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      if (!store || store === "total") return;

      if (CITY_STORES.bangalore.includes(store)) blr.push(r.cloneNode(true));
      if (CITY_STORES.hyderabad.includes(store)) hyd.push(r.cloneNode(true));
    });

    document.getElementById("output").innerHTML = `
      <h2>Bangalore</h2>
      <button onclick="downloadTablePNG('blrTable','Bangalore_Report')">⬇ Download</button>
      <button onclick="showBLRDeepPain()">Deep Pain Orders</button>
      <button onclick="showBLRDeepPainDetails()">Deep Pain Details</button>

      <div id="blrTable">
        ${buildFinalTable(blr)}
      </div>

      <div id="blrDeepPainContainer"></div>

      <hr style="margin:50px 0;">

      <h2>Hyderabad</h2>
      <button onclick="downloadTablePNG('hydTable','Hyderabad_Report')">⬇ Download</button>
      <button onclick="showHYDDeepPain()">Deep Pain Orders</button>
      <button onclick="showHYDDeepPainDetails()">Deep Pain Details</button>

      <div id="hydTable">
        ${buildFinalTable(hyd)}
      </div>

      <div id="hydDeepPainContainer"></div>
    `;
  };
}

function formatStoreName(store) {
  return store
    .replace(/^hyd\s+/i, "")          // agar future mein HYD aa jaye
    .replace(/\b\w/g, c => c.toUpperCase());
}

function buildFinalTable(rows) {
  const base = document.getElementById("summaryTable").cloneNode(true);
  base.className = "clean-table";

  const oldTfoot = base.querySelector("tfoot");
  if (oldTfoot) oldTfoot.remove();
 const now = getEffectiveDateTime();
const hourLabel = getCumulativeHourLabel(getEffectiveHour());
  /* =========================
     REBUILD HEADER (ONLY REQUIRED COLUMNS)
  ========================= */
  const thead = base.querySelector("thead");
  thead.innerHTML = `
    <tr>
      <th>Store</th>
      <th>Projected Orders</th>
    <th>Projected Orders (Till ${hourLabel})</th>
    <th>Projected Orders (Till ${hourLabel} + Buffer)</th>
      <th>Total Orders</th>
      <th>Cancelled %</th>
      <th>Delivered Orders</th>
      <th>Deep Pain %</th>
      <th>Actual Riders</th>
      <th>Idle Rider</th>
      <th>BF</th>
      <th>Order Attainment %</th>
      <th>Deep Pain (Order Count)</th>
      <th>Additional Orders</th>
      <th>@Actual Deep Pain %</th>
    </tr>
  `;

  const tbody = base.querySelector("tbody");
  tbody.innerHTML = "";

  /* =========================
     TOTAL / AVG HOLDERS
  ========================= */
  let sumProjFull = 0;
  let sumProjTill = 0;
  let sumProjBuffer = 0;

  let sumTotalOrders = 0;
  let sumDelivered = 0;
  let sumActualRiders = 0;
  let sumIdleRider = 0;
  let sumDeepPainCount = 0;
  let sumAdditionalOrders = 0;

  let sumCancelledPct = 0;
  let sumDeepPainPct = 0;
  let sumBF = 0;
  let sumOrderAttainment = 0;
  let sumActualDeepPainPct = 0;

  let storeCount = 0;

  /* =========================
     ROW LOOP
  ========================= */
  rows.forEach(r => {
    const tds = r.querySelectorAll("td");

    const store = tds[0].innerText.trim().toLowerCase().replace(/\s+/g, " ");
    const totalOrders = Number(tds[1]?.innerText) || 0;
    const cancelledPct = parseFloat(tds[3]?.innerText.replace("%", "")) || 0;
    const delivered = Number(tds[4]?.innerText) || 0;
    const deepPain = Number(tds[6]?.innerText) || 0;
    const deepPainPct = parseFloat(tds[7]?.innerText.replace("%", "")) || 0;
    const deepPainColor = deepPainPct < 5 ? "#1B5E20" : "#7A1F1F";


    const actualRiders = Number(tds[8]?.querySelector("input")?.value) || 0;
    const idleRider = Number(tds[9]?.querySelector("input")?.value) || 0;
    const bf = Number(tds[10]?.querySelector("input")?.value) || 0;

    /* ===== Projection lookup ===== */
    const proj = getProjectionForStore(store);

const projFull = proj.fullDay;
const projTill = proj.till;
const projBuffer = proj.buffer;

    const orderAttainment = projTill
      ? ((delivered / projTill) * 100).toFixed(2)
      : "0.00";

    const additionalOrders = Math.max(projTill - delivered, 0);

    const actualDeepPain = delivered
      ? ((deepPain / delivered) * 100).toFixed(2)
      : "0.00";

    /* ===== SUM / AVG ===== */
    sumProjFull += projFull;
    sumProjTill += projTill;
    sumProjBuffer += projBuffer;

    sumTotalOrders += totalOrders;
    sumDelivered += delivered;
    sumActualRiders += actualRiders;
    sumIdleRider += idleRider;
    sumDeepPainCount += deepPain;
    sumAdditionalOrders += additionalOrders;

    sumCancelledPct += cancelledPct;
    sumDeepPainPct += deepPainPct;
    sumBF += bf;
    sumOrderAttainment += parseFloat(orderAttainment);
    sumActualDeepPainPct += parseFloat(actualDeepPain);

    storeCount++;

    /* ===== FINAL ROW ===== */
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${formatStoreName(store)}</td>
      <td>${projFull}</td>
      <td>${projTill}</td>
      <td>${projBuffer}</td>
      <td>${totalOrders}</td>
      <td>${cancelledPct}%</td>
      <td>${delivered}</td>
      <td style="color:${deepPainColor}; font-weight:600;">
      ${deepPainPct}%
      </td>
      <td>${actualRiders}</td>
      <td>${idleRider}</td>
      <td>${bf}</td>
      <td>${orderAttainment}%</td>
      <td>${deepPain}</td>
      <td>${additionalOrders}</td>
      <td>${actualDeepPain}%</td>
    `;

    tbody.appendChild(tr);
  });

  /* =========================
     TOTAL ROW
  ========================= */
  const totalRow = document.createElement("tr");
  totalRow.className = "total-row";
  totalRow.style.fontWeight = "bold";

  totalRow.innerHTML = `
    <td>Total</td>
    <td>${sumProjFull}</td>
    <td>${sumProjTill}</td>
    <td>${sumProjBuffer}</td>
    <td>${sumTotalOrders}</td>
    <td>${(sumCancelledPct / storeCount).toFixed(2)}%</td>
    <td>${sumDelivered}</td>
    <td style="color:${(sumDeepPainPct / storeCount) < 5 ? "#2ecc71" : "#e74c3c"}; font-weight:700;">
    ${(sumDeepPainPct / storeCount).toFixed(2)}%
     </td>
    <td>${sumActualRiders}</td>
    <td>${sumIdleRider}</td>
    <td>${(sumBF / storeCount).toFixed(2)}</td>
    <td>${(sumOrderAttainment / storeCount).toFixed(2)}%</td>
    <td>${sumDeepPainCount}</td>
    <td>${sumAdditionalOrders}</td>
    <td>${(sumActualDeepPainPct / storeCount).toFixed(2)}%</td>
  `;

  tbody.appendChild(totalRow);
  /* =========================
   FOOTER ROW (BRANDING)
========================= */
const footerRow = document.createElement("tr");

footerRow.innerHTML = `
  <td colspan="15"
      style="
        text-align:center;
        font-size:12px;
        font-weight:500;
        padding:10px;
        color:#000;
        border-top:1px solid #ddd;
        letter-spacing:0.3px;
      ">
    Powered by SASA Automation | Harshit Saini – Data Analyst, Zippee
  </td>
`;

tbody.appendChild(footerRow);

  return base.outerHTML;
}



/*****************************************************
 * PART 4: DEEP PAIN ORDERS + DETAILS + SEARCH + UTILS
 *****************************************************/
function extractDeepPainOrders(fileData) {
  blrDeepPain = [];
  hydDeepPain = [];

  fileData.forEach(order => {
    const status = (order["Order Status"] || "").toLowerCase();
    const breached = (order["Breached"] || "").toLowerCase();
    const duration = Number(order["Breached Duration (In Min)"]) || 0;

    if (status === "delivered" && breached === "yes" && duration > 15) {
      const store = (order["Store Name"] || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\s+/g, " ");

      const obj = {
        orderNumber: order["Order Number"] || "",
        orderDate: order["Order Date"] || "",
        store,
        breached,
        duration
      };

      if (CITY_STORES.bangalore.includes(store)) blrDeepPain.push(obj);
      if (CITY_STORES.hyderabad.includes(store)) hydDeepPain.push(obj);
    }
  });
}

function extractDeepPainOrders_details(fileData) {
  blrDeepPainDetails = [];
  hydDeepPainDetails = [];

  fileData.forEach(order => {
    const status = (order["Order Status"] || "").toLowerCase();
    const breached = (order["Breached"] || "").toLowerCase();
    const duration = Number(order["Breached Duration (In Min)"]) || 0;

    if (status === "delivered" && breached === "yes" && duration > 15) {
      const store = (order["Store Name"] || "")
        .trim()
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\s+/g, " ");

      const obj = {
        orderNumber: order["Order Number"] || "",
        orderDate: order["Order Date"] || "",
        store,
        breached,
        duration,
        orderStatus: order["Order Status"] || "",
        customer: order["Customer Name"] || "",
        raw: JSON.stringify(order)
      };

      if (CITY_STORES.bangalore.includes(store)) blrDeepPainDetails.push(obj);
      if (CITY_STORES.hyderabad.includes(store)) hydDeepPainDetails.push(obj);
    }
  });
}


/* =========================
   RENDER DEEP PAIN DETAILS
========================= */

function renderDeepPainDetailsTable(rows) {
  const tbody = document.querySelector(
    "#DeepPainOrders_detailsTable tbody"
  );
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!rows.length) {
    tbody.innerHTML =
      "<tr><td colspan='9'>No Deep Pain Details Found</td></tr>";
    return;
  }

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.orderNumber}</td>
      <td>${r.orderDate}</td>
      <td>${r.store}</td>
      <td>${r.breached}</td>
      <td>${r.duration}</td>
      <td class="dp-bad">Deep Pain</td>
      <td>${r.orderStatus}</td>
      <td>${r.customer}</td>
      <td><pre style="max-width:220px;white-space:pre-wrap;">${r.raw}</pre></td>
    `;
    tbody.appendChild(tr);
  });
}

/* =========================
   UTILITIES
========================= */

function excelDateToJSDate(serial) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date = new Date(utc_value * 1000);
  const frac = serial - Math.floor(serial);
  date.setSeconds(Math.round(frac * 86400));
  return date;
}

function formatDate(d) {
  const p = n => (n < 10 ? "0" + n : n);
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(
    d.getHours()
  )}:${p(d.getMinutes())}`;
}
document.getElementById("submitBtn")?.addEventListener("click", processFile);
document.getElementById("searchBtn")?.addEventListener("click", () => {
  const dateVal = document.getElementById("searchDate")?.value;
  const timeVal = document.getElementById("searchTime")?.value;

  if (dateVal && timeVal) {
    selectedDateTime = `${dateVal}T${timeVal}`; // 🔍 search mode
  } else {
    selectedDateTime = null; // 🔴 back to live
  }

  generateSummaryTable(); // re-render projection
});

function downloadTablePNG(elementId, fileName) {
  const element = document.getElementById(elementId);
  if (!element) {
    alert("Table not found!");
    return;
  }


  // temporarily expand container
  const originalOverflow = element.style.overflow;
  const originalWidth = element.style.width;

  element.style.overflow = "visible";
  element.style.width = element.scrollWidth + "px";

  html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: element.scrollWidth,
    height: element.scrollHeight,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  }).then(canvas => {
    const link = document.createElement("a");
    link.download = fileName + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();

    // restore styles
    element.style.overflow = originalOverflow;
    element.style.width = originalWidth;
  });
}
function renderDeepPainTable(rows, tableId) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  if (!tbody) return;

  tbody.innerHTML = "";

  if (!rows.length) {
    tbody.innerHTML =
      "<tr><td colspan='6'>No Deep Pain Orders Found</td></tr>";
    return;
  }

  rows.forEach(r => {
    let date = r.orderDate;
    if (!isNaN(date)) {
      date = formatDate(excelDateToJSDate(Number(date)));
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${r.orderNumber}</td>
      <td>${date}</td>
      <td>${r.store}</td>
      <td>${r.breached}</td>
      <td>${r.duration}</td>
      <td class="dp-bad">Deep Pain</td>
    `;
    tbody.appendChild(tr);
  });
}

function showBLRDeepPain() {
  const container = document.getElementById("blrDeepPainContainer");

  container.innerHTML = `
    <h3>Deep Pain Orders (Bangalore)</h3>
    <table class="clean-table" id="blrDeepPainTable">
      <thead>
        <tr>
          <th>Order No</th>
          <th>Date</th>
          <th>Store</th>
          <th>Breached</th>
          <th>Minutes</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  renderDeepPainTable(blrDeepPain, "blrDeepPainTable");
}
function showHYDDeepPain() {
  const container = document.getElementById("hydDeepPainContainer");

  container.innerHTML = `
    <h3>Deep Pain Orders (Hyderabad)</h3>
    <table class="clean-table" id="hydDeepPainTable">
      <thead>
        <tr>
          <th>Order No</th>
          <th>Date</th>
          <th>Store</th>
          <th>Breached</th>
          <th>Minutes</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  renderDeepPainTable(hydDeepPain, "hydDeepPainTable");
}
