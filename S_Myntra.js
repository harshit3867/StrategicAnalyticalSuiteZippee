/*************************************************
 * ZIPPEE – UNIFIED DASHBOARD JS (STABLE VERSION)
 * OUTPUT: 100% SAME AS YOUR CURRENT IMPLEMENTATION
 *************************************************/

const DARK_STORES = [
  "Kalyan Nagar_mnow",
  "Basaveshwar Nagar_mnow",
  "Jakkur_mnow",
  "Begur_mnow",
  "Thyagaraja Nagar_mnow",
  "Brookfield_mnow",
  "JP nagar_mnow",
  "Sarjapur Road_mnow",
  "Attapur_mnow",
 "Gachibowli_mnow",
   "Manikonda_mnow",
 "Nizampet_mnow"
];


/* ------------------ UI HELPERS ------------------ */
function zippeeToggleMenu() {
  document.querySelector(".nav-links")?.classList.toggle("active");
}

function getDayName(date) {
  return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][date.getDay()];
}

function getTodayDateString() {
  const d = new Date();
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`;
}

function getCurrentTimeString() {
  return new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'});
}

/* ------------------ DATA ------------------ */
/* 🔴 YOUR reportData + hourPercentages REMAIN UNCHANGED */
const reportData=[
{
  day: "Thursday",
  date: "1/1/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 279,
    "Begur_mnow": 651,
    "Brookfield_mnow": 789,
    "Jakkur_mnow": 268,
    "JP nagar_mnow": 380,
    "Kalyan Nagar_mnow": 405,
    "Sarjapur Road_mnow": 386,
    "Thyagaraja Nagar_mnow": 352,
    "Attapur_mnow": 138,
    "Gachibowli_mnow": 352,
    "Manikonda_mnow": 208,
    "Nizampet_mnow": 187
},
  total: 4395
},
{
  day: "Friday",
  date: "1/2/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 368,
    "Begur_mnow": 784,
    "Brookfield_mnow": 998,
    "Jakkur_mnow": 386,
    "JP nagar_mnow": 503,
    "Kalyan Nagar_mnow": 563,
    "Sarjapur Road_mnow": 468,
    "Thyagaraja Nagar_mnow": 428,
    "Attapur_mnow": 163,
    "Gachibowli_mnow": 424,
    "Manikonda_mnow": 254,
    "Nizampet_mnow": 213
},
  total: 5552
},
{
  day: "Saturday",
  date: "1/3/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 484,
    "Begur_mnow": 1009,
    "Brookfield_mnow": 1214,
    "Jakkur_mnow": 380,
    "JP nagar_mnow": 586,
    "Kalyan Nagar_mnow": 677,
    "Sarjapur Road_mnow": 571,
    "Thyagaraja Nagar_mnow": 595,
    "Attapur_mnow": 177,
    "Gachibowli_mnow": 485,
    "Manikonda_mnow": 303,
    "Nizampet_mnow": 246
},
  total: 6727
},
{
  day: "Sunday",
  date: "1/4/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 420,
    "Begur_mnow": 874,
    "Brookfield_mnow": 1038,
    "Jakkur_mnow": 334,
    "JP nagar_mnow": 508,
    "Kalyan Nagar_mnow": 566,
    "Sarjapur Road_mnow": 503,
    "Thyagaraja Nagar_mnow": 421,
    "Attapur_mnow": 200,
    "Gachibowli_mnow": 502,
    "Manikonda_mnow": 284,
    "Nizampet_mnow": 236
},
  total: 5886
},
{
  day: "Monday",
  date: "1/5/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 319,
    "Begur_mnow": 766,
    "Brookfield_mnow": 849,
    "Jakkur_mnow": 299,
    "JP nagar_mnow": 409,
    "Kalyan Nagar_mnow": 527,
    "Sarjapur Road_mnow": 470,
    "Thyagaraja Nagar_mnow": 380,
    "Attapur_mnow": 158,
    "Gachibowli_mnow": 336,
    "Manikonda_mnow": 237,
    "Nizampet_mnow": 181
},
  total: 4931
},
{
  day: "Tuesday",
  date: "1/6/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 391,
    "Begur_mnow": 831,
    "Brookfield_mnow": 1063,
    "Jakkur_mnow": 373,
    "JP nagar_mnow": 481,
    "Kalyan Nagar_mnow": 563,
    "Sarjapur Road_mnow": 469,
    "Thyagaraja Nagar_mnow": 461,
    "Attapur_mnow": 205,
    "Gachibowli_mnow": 485,
    "Manikonda_mnow": 287,
    "Nizampet_mnow": 266
},
  total: 5875
},
{
  day: "Wednesday",
  date: "1/7/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 290,
    "Begur_mnow": 633,
    "Brookfield_mnow": 761,
    "Jakkur_mnow": 235,
    "JP nagar_mnow": 369,
    "Kalyan Nagar_mnow": 406,
    "Sarjapur Road_mnow": 333,
    "Thyagaraja Nagar_mnow": 396,
    "Attapur_mnow": 211,
    "Gachibowli_mnow": 390,
    "Manikonda_mnow": 239,
    "Nizampet_mnow": 220
},
  total: 4483
},
{
  day: "Thursday",
  date: "1/8/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 295,
    "Begur_mnow": 647,
    "Brookfield_mnow": 779,
    "Jakkur_mnow": 266,
    "JP nagar_mnow": 376,
    "Kalyan Nagar_mnow": 402,
    "Sarjapur Road_mnow": 383,
    "Thyagaraja Nagar_mnow": 418,
    "Attapur_mnow": 184,
    "Gachibowli_mnow": 415,
    "Manikonda_mnow": 244,
    "Nizampet_mnow": 242
},
  total: 4651
},
{
  day: "Friday",
  date: "1/9/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 504,
    "Begur_mnow": 1016,
    "Brookfield_mnow": 1283,
    "Jakkur_mnow": 498,
    "JP nagar_mnow": 648,
    "Kalyan Nagar_mnow": 728,
    "Sarjapur Road_mnow": 604,
    "Thyagaraja Nagar_mnow": 664,
    "Attapur_mnow": 304,
    "Gachibowli_mnow": 691,
    "Manikonda_mnow": 414,
    "Nizampet_mnow": 384
},
  total: 7738
},
{
  day: "Saturday",
  date: "1/10/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 554,
    "Begur_mnow": 1093,
    "Brookfield_mnow": 1304,
    "Jakkur_mnow": 411,
    "JP nagar_mnow": 631,
    "Kalyan Nagar_mnow": 732,
    "Sarjapur Road_mnow": 616,
    "Thyagaraja Nagar_mnow": 770,
    "Attapur_mnow": 257,
    "Gachibowli_mnow": 619,
    "Manikonda_mnow": 389,
    "Nizampet_mnow": 347
},
  total: 7723
},
{
  day: "Sunday",
  date: "1/11/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 473,
    "Begur_mnow": 929,
    "Brookfield_mnow": 1096,
    "Jakkur_mnow": 355,
    "JP nagar_mnow": 538,
    "Kalyan Nagar_mnow": 600,
    "Sarjapur Road_mnow": 533,
    "Thyagaraja Nagar_mnow": 536,
    "Attapur_mnow": 274,
    "Gachibowli_mnow": 601,
    "Manikonda_mnow": 340,
    "Nizampet_mnow": 312
},
  total: 6587
},
{
  day: "Monday",
  date: "1/12/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 323,
    "Begur_mnow": 733,
    "Brookfield_mnow": 807,
    "Jakkur_mnow": 286,
    "JP nagar_mnow": 390,
    "Kalyan Nagar_mnow": 504,
    "Sarjapur Road_mnow": 448,
    "Thyagaraja Nagar_mnow": 436,
    "Attapur_mnow": 194,
    "Gachibowli_mnow": 364,
    "Manikonda_mnow": 257,
    "Nizampet_mnow": 217
},
  total: 4959
},
{
  day: "Tuesday",
  date: "1/13/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 407,
    "Begur_mnow": 789,
    "Brookfield_mnow": 1036,
    "Jakkur_mnow": 366,
    "JP nagar_mnow": 469,
    "Kalyan Nagar_mnow": 553,
    "Sarjapur Road_mnow": 459,
    "Thyagaraja Nagar_mnow": 542,
    "Attapur_mnow": 258,
    "Gachibowli_mnow": 537,
    "Manikonda_mnow": 317,
    "Nizampet_mnow": 325
},
  total: 6058
},
{
  day: "Wednesday",
  date: "1/14/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 415,
    "Begur_mnow": 877,
    "Brookfield_mnow": 1091,
    "Jakkur_mnow": 335,
    "JP nagar_mnow": 529,
    "Kalyan Nagar_mnow": 580,
    "Sarjapur Road_mnow": 476,
    "Thyagaraja Nagar_mnow": 567,
    "Attapur_mnow": 289,
    "Gachibowli_mnow": 533,
    "Manikonda_mnow": 327,
    "Nizampet_mnow": 302
},
  total: 6321
},
{
  day: "Thursday",
  date: "1/15/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 373,
    "Begur_mnow": 821,
    "Brookfield_mnow": 988,
    "Jakkur_mnow": 337,
    "JP nagar_mnow": 476,
    "Kalyan Nagar_mnow": 509,
    "Sarjapur Road_mnow": 485,
    "Thyagaraja Nagar_mnow": 530,
    "Attapur_mnow": 223,
    "Gachibowli_mnow": 503,
    "Manikonda_mnow": 295,
    "Nizampet_mnow": 294
},
  total: 5834
},
{
  day: "Friday",
  date: "1/16/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 423,
    "Begur_mnow": 837,
    "Brookfield_mnow": 1074,
    "Jakkur_mnow": 417,
    "JP nagar_mnow": 542,
    "Kalyan Nagar_mnow": 659,
    "Sarjapur Road_mnow": 506,
    "Thyagaraja Nagar_mnow": 556,
    "Attapur_mnow": 242,
    "Gachibowli_mnow": 550,
    "Manikonda_mnow": 331,
    "Nizampet_mnow": 306
},
  total: 6443
},
{
  day: "Saturday",
  date: "1/17/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 474,
    "Begur_mnow": 922,
    "Brookfield_mnow": 1116,
    "Jakkur_mnow": 352,
    "JP nagar_mnow": 540,
    "Kalyan Nagar_mnow": 679,
    "Sarjapur Road_mnow": 527,
    "Thyagaraja Nagar_mnow": 659,
    "Attapur_mnow": 211,
    "Gachibowli_mnow": 506,
    "Manikonda_mnow": 317,
    "Nizampet_mnow": 284
},
  total: 6587
},
{
  day: "Sunday",
  date: "1/18/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 473,
    "Begur_mnow": 914,
    "Brookfield_mnow": 1094,
    "Jakkur_mnow": 354,
    "JP nagar_mnow": 537,
    "Kalyan Nagar_mnow": 700,
    "Sarjapur Road_mnow": 532,
    "Thyagaraja Nagar_mnow": 535,
    "Attapur_mnow": 274,
    "Gachibowli_mnow": 602,
    "Manikonda_mnow": 340,
    "Nizampet_mnow": 313
},
  total: 6668
},
{
  day: "Monday",
  date: "1/19/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 238,
    "Begur_mnow": 529,
    "Brookfield_mnow": 591,
    "Jakkur_mnow": 210,
    "JP nagar_mnow": 286,
    "Kalyan Nagar_mnow": 431,
    "Sarjapur Road_mnow": 330,
    "Thyagaraja Nagar_mnow": 319,
    "Attapur_mnow": 142,
    "Gachibowli_mnow": 267,
    "Manikonda_mnow": 187,
    "Nizampet_mnow": 159
},
  total: 3689
},
{
  day: "Tuesday",
  date: "1/20/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 272,
    "Begur_mnow": 537,
    "Brookfield_mnow": 692,
    "Jakkur_mnow": 244,
    "JP nagar_mnow": 314,
    "Kalyan Nagar_mnow": 461,
    "Sarjapur Road_mnow": 307,
    "Thyagaraja Nagar_mnow": 362,
    "Attapur_mnow": 173,
    "Gachibowli_mnow": 358,
    "Manikonda_mnow": 212,
    "Nizampet_mnow": 217
},
  total: 4149
},
{
  day: "Wednesday",
  date: "1/21/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 365,
    "Begur_mnow": 785,
    "Brookfield_mnow": 958,
    "Jakkur_mnow": 295,
    "JP nagar_mnow": 465,
    "Kalyan Nagar_mnow": 638,
    "Sarjapur Road_mnow": 418,
    "Thyagaraja Nagar_mnow": 499,
    "Attapur_mnow": 249,
    "Gachibowli_mnow": 459,
    "Manikonda_mnow": 281,
    "Nizampet_mnow": 260
},
  total: 5672
},
{
  day: "Thursday",
  date: "1/22/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 367,
    "Begur_mnow": 795,
    "Brookfield_mnow": 972,
    "Jakkur_mnow": 331,
    "JP nagar_mnow": 468,
    "Kalyan Nagar_mnow": 626,
    "Sarjapur Road_mnow": 478,
    "Thyagaraja Nagar_mnow": 522,
    "Attapur_mnow": 215,
    "Gachibowli_mnow": 484,
    "Manikonda_mnow": 285,
    "Nizampet_mnow": 283
},
  total: 5826
},
{
  day: "Friday",
  date: "1/23/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 401,
    "Begur_mnow": 781,
    "Brookfield_mnow": 1019,
    "Jakkur_mnow": 395,
    "JP nagar_mnow": 514,
    "Kalyan Nagar_mnow": 761,
    "Sarjapur Road_mnow": 481,
    "Thyagaraja Nagar_mnow": 527,
    "Attapur_mnow": 225,
    "Gachibowli_mnow": 511,
    "Manikonda_mnow": 307,
    "Nizampet_mnow": 284
},
  total: 6206
},
{
  day: "Saturday",
  date: "1/24/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 430,
    "Begur_mnow": 822,
    "Brookfield_mnow": 1014,
    "Jakkur_mnow": 320,
    "JP nagar_mnow": 490,
    "Kalyan Nagar_mnow": 750,
    "Sarjapur Road_mnow": 479,
    "Thyagaraja Nagar_mnow": 599,
    "Attapur_mnow": 187,
    "Gachibowli_mnow": 449,
    "Manikonda_mnow": 281,
    "Nizampet_mnow": 252
},
  total: 6073
},
{
  day: "Sunday",
  date: "1/25/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 398,
    "Begur_mnow": 744,
    "Brookfield_mnow": 921,
    "Jakkur_mnow": 298,
    "JP nagar_mnow": 451,
    "Kalyan Nagar_mnow": 656,
    "Sarjapur Road_mnow": 447,
    "Thyagaraja Nagar_mnow": 450,
    "Attapur_mnow": 225,
    "Gachibowli_mnow": 494,
    "Manikonda_mnow": 279,
    "Nizampet_mnow": 256
},
  total: 5619
},
{
  day: "Monday",
  date: "1/26/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 304,
    "Begur_mnow": 666,
    "Brookfield_mnow": 758,
    "Jakkur_mnow": 269,
    "JP nagar_mnow": 367,
    "Kalyan Nagar_mnow": 623,
    "Sarjapur Road_mnow": 422,
    "Thyagaraja Nagar_mnow": 409,
    "Attapur_mnow": 179,
    "Gachibowli_mnow": 334,
    "Manikonda_mnow": 235,
    "Nizampet_mnow": 200
},
  total: 4766
},
{
  day: "Tuesday",
  date: "1/27/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 312,
    "Begur_mnow": 614,
    "Brookfield_mnow": 792,
    "Jakkur_mnow": 280,
    "JP nagar_mnow": 359,
    "Kalyan Nagar_mnow": 563,
    "Sarjapur Road_mnow": 352,
    "Thyagaraja Nagar_mnow": 414,
    "Attapur_mnow": 194,
    "Gachibowli_mnow": 402,
    "Manikonda_mnow": 238,
    "Nizampet_mnow": 243
},
  total: 4763
},
{
  day: "Wednesday",
  date: "1/28/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 333,
    "Begur_mnow": 715,
    "Brookfield_mnow": 873,
    "Jakkur_mnow": 269,
    "JP nagar_mnow": 423,
    "Kalyan Nagar_mnow": 620,
    "Sarjapur Road_mnow": 382,
    "Thyagaraja Nagar_mnow": 455,
    "Attapur_mnow": 226,
    "Gachibowli_mnow": 418,
    "Manikonda_mnow": 257,
    "Nizampet_mnow": 237
},
  total: 5208
},
{
  day: "Thursday",
  date: "1/29/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 333,
    "Begur_mnow": 721,
    "Brookfield_mnow": 882,
    "Jakkur_mnow": 301,
    "JP nagar_mnow": 425,
    "Kalyan Nagar_mnow": 606,
    "Sarjapur Road_mnow": 433,
    "Thyagaraja Nagar_mnow": 472,
    "Attapur_mnow": 195,
    "Gachibowli_mnow": 439,
    "Manikonda_mnow": 258,
    "Nizampet_mnow": 257
},
  total: 5322
},
{
  day: "Friday",
  date: "1/30/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 366,
    "Begur_mnow": 725,
    "Brookfield_mnow": 931,
    "Jakkur_mnow": 361,
    "JP nagar_mnow": 469,
    "Kalyan Nagar_mnow": 704,
    "Sarjapur Road_mnow": 438,
    "Thyagaraja Nagar_mnow": 481,
    "Attapur_mnow": 206,
    "Gachibowli_mnow": 467,
    "Manikonda_mnow": 280,
    "Nizampet_mnow": 260
},
  total: 5688
},
{
  day: "Saturday",
  date: "1/31/2026",
  stores: {
    "Basaveshwar Nagar_mnow": 493,
    "Begur_mnow": 957,
    "Brookfield_mnow": 1159,
    "Jakkur_mnow": 366,
    "JP nagar_mnow": 561,
    "Kalyan Nagar_mnow": 868,
    "Sarjapur Road_mnow": 548,
    "Thyagaraja Nagar_mnow": 684,
    "Attapur_mnow": 215,
    "Gachibowli_mnow": 515,
    "Manikonda_mnow": 322,
    "Nizampet_mnow": 288
},
  total: 6976
}
];

// we add the new hour percentages data here

const hourPercentages = [
  { hour: "6-7",   Sunday: 0.57,  Monday: 1.20,  Tuesday: 1.54,  Wednesday: 1.32,  Thursday: 1.23,  Friday: 1.38,  Saturday: 1.11 },
  { hour: "7-8",   Sunday: 1.68,  Monday: 3.74,  Tuesday: 4.57,  Wednesday: 4.25,  Thursday: 3.97,  Friday: 4.15,  Saturday: 3.82 },
  { hour: "8-9",   Sunday: 4.57,  Monday: 7.95,  Tuesday: 9.25,  Wednesday: 9.21,  Thursday: 8.73,  Friday: 9.50,  Saturday: 7.85 },
  { hour: "9-10",  Sunday: 10.43, Monday: 13.90, Tuesday: 14.93, Wednesday: 15.05, Thursday: 15.06, Friday: 15.84, Saturday: 14.16 },
  { hour: "10-11", Sunday: 17.34, Monday: 20.67, Tuesday: 22.29, Wednesday: 22.70, Thursday: 21.93, Friday: 23.18, Saturday: 20.56 },
  { hour: "11-12", Sunday: 25.73, Monday: 28.04, Tuesday: 28.46, Wednesday: 30.44, Thursday: 29.58, Friday: 30.51, Saturday: 27.06 },
  { hour: "12-1",  Sunday: 33.96, Monday: 34.83, Tuesday: 35.31, Wednesday: 37.17, Thursday: 36.61, Friday: 38.49, Saturday: 35.71 },
  { hour: "1-2",   Sunday: 41.19, Monday: 41.21, Tuesday: 41.77, Wednesday: 43.08, Thursday: 42.81, Friday: 45.37, Saturday: 43.99 },
  { hour: "2-3",   Sunday: 48.65, Monday: 47.49, Tuesday: 47.20, Wednesday: 49.37, Thursday: 49.47, Friday: 51.46, Saturday: 51.40 },
  { hour: "3-4",   Sunday: 55.32, Monday: 53.73, Tuesday: 52.63, Wednesday: 55.65, Thursday: 55.35, Friday: 57.36, Saturday: 58.81 },
  { hour: "4-5",   Sunday: 63.10, Monday: 60.98, Tuesday: 59.14, Wednesday: 62.75, Thursday: 61.85, Friday: 63.59, Saturday: 65.81 },
  { hour: "5-6",   Sunday: 70.83, Monday: 68.44, Tuesday: 65.51, Wednesday: 69.75, Thursday: 68.56, Friday: 70.56, Saturday: 73.29 },
  { hour: "6-7",   Sunday: 78.05, Monday: 74.83, Tuesday: 72.41, Wednesday: 76.88, Thursday: 75.70, Friday: 77.49, Saturday: 79.93 },
  { hour: "7-8",   Sunday: 85.12, Monday: 82.15, Tuesday: 80.19, Wednesday: 84.34, Thursday: 83.52, Friday: 84.78, Saturday: 86.40 },
  { hour: "8-9",   Sunday: 91.00, Monday: 89.41, Tuesday: 87.49, Wednesday: 90.93, Thursday: 90.41, Friday: 90.91, Saturday: 91.35 },
  { hour: "9-10",  Sunday: 96.99, Monday: 95.42, Tuesday: 94.73, Wednesday: 96.04, Thursday: 96.24, Friday: 96.24, Saturday: 96.18 },
  { hour: "10-11", Sunday: 100.01, Monday: 99.99, Tuesday: 100.00, Wednesday: 99.96, Thursday: 100.02, Friday: 100.01, Saturday: 99.99 }
];


/* 👉 PASTE THEM ABOVE THIS COMMENT AS-IS */

/* ------------------ STATE ------------------ */
const AppState = {
  summary: {},
  deepPain: [],
  deepPainDetails: []
};

/* ------------------ FINAL TABLE LOGIC ------------------ */
function generateFinalTable() {
  const GROUP_1 = [
  "Kalyan Nagar_mnow",
  "Basaveshwar Nagar_mnow",
  "Jakkur_mnow",
  "Begur_mnow",
  "Thyagaraja Nagar_mnow",
  "Brookfield_mnow",
  "JP nagar_mnow",
  "Sarjapur Road_mnow"
];

const GROUP_2 = [
  "Attapur_mnow",
  "Gachibowli_mnow",
  "Manikonda_mnow",
  "Nizampet_mnow"
];

  const projectionTable = document.getElementById("reportTable");
  const summaryTable = document.getElementById("summaryTable");
  const output = document.getElementById("output");

  if (!projectionTable || !summaryTable) {
    alert("Projection or Summary table missing");
    return;
  }

  const projRows = projectionTable.querySelectorAll("tbody tr");
  const sumRows = summaryTable.querySelectorAll("tbody tr");

  // STEP 1: totals
  let totals1 = {
  projectedFull: 0,
  projectedTill: 0,
  projectedBuffer: 0,
  totalOrders: 0,
  delivered: 0,
  deepPainCount: 0,
  additionalOrders: 0,
  actualRiders: 0,
  idleRider: 0
};

let totals2 = {
  projectedFull: 0,
  projectedTill: 0,
  projectedBuffer: 0,
  totalOrders: 0,
  delivered: 0,
  deepPainCount: 0,
  additionalOrders: 0,
  actualRiders: 0,
  idleRider: 0
};

let cancelledPctArr1 = [], cancelledPctArr2 = [];
let deepPainPctArr1 = [], deepPainPctArr2 = [];
let orderAttainmentArr1 = [], orderAttainmentArr2 = [];
let actualDeepPainArr1 = [], actualDeepPainArr2 = [];
let bfArr1 = [], bfArr2 = [];

/// Watermark
const watermarkRowHTML = `
<tr>
  <td colspan="15"
      style="
        text-align:center;
        font-size:12px;
        font-style:italic;
        color:#666;
        padding:8px;
        background:#f9f9f9;
      ">
    Powered by <b>SASA Automation</b> | Harshit Saini – Data Analyst, Zippee
  </td>
</tr>
`;


// STEP 2: loop store rows only (CORRECT VERSION)

// 🔹 build projection row map ONCE
const projRowMap = {};
projRows.forEach(row => {
  const name = row.querySelector("td")?.textContent.trim();
  if (name && name.toLowerCase() !== "total") {
    projRowMap[name] = row.querySelectorAll("td");
  }
});

// 🔹 now loop summary rows
let table1Rows = "";
let table2Rows = "";
for (let i = 0; i < sumRows.length; i++) {
  const sCells = sumRows[i].querySelectorAll("td");
  const store = sCells[0].textContent.trim();

  // skip summary total row
  if (store.toLowerCase() === "total") continue;

  // get matching projection row by STORE NAME
const pCells = projRowMap[store] || [];

  // ---- values from projection table ----
  const projectedFull = Number(pCells[1].textContent) || 0;
  const projectedTill = Number(pCells[2].textContent) || 0;
  const projectedBuffer = Number(pCells[3].textContent) || 0;

  // ---- values from summary table ----
  const totalOrders = Number(sCells[1].textContent) || 0;
  const cancelledPct =
  totalOrders > 0 ? parseFloat(sCells[3].textContent) || 0 : 0;
  const delivered = Number(sCells[4].textContent) || 0;
  const deepPainPct =
  delivered > 0 ? parseFloat(sCells[7].textContent) || 0 : 0;

  const actualRiders = Number(sCells[8].querySelector("input")?.value) || 0;
  const idleRider = Number(sCells[9].querySelector("input")?.value) || 0;
  const bf = Number(sCells[10].querySelector("input")?.value) || 0;

  // ---- calculations ----
  const orderAttainment =
    projectedTill > 0
      ? ((totalOrders / projectedTill) * 100).toFixed(2)
      : "0.00";

  const deepPainCount = ((totalOrders * deepPainPct) / 100).toFixed(2);
  const additionalOrders = Math.max(totalOrders - projectedBuffer, 0);

  const correctedDeepPain = deepPainCount - additionalOrders;
  const actualDeepPain =
    totalOrders > 0
      ? Math.max((correctedDeepPain / totalOrders) * 100, 0).toFixed(2)
      : "0.00";


  // ---- render row ----
 const rowHTML = `
  <tr>
    <td>${store}</td>
    <td>${projectedFull}</td>
    <td>${projectedTill}</td>
    <td>${projectedBuffer}</td>
    <td>${totalOrders}</td>
    <td>${cancelledPct.toFixed(2)}%</td>
    <td>${delivered}</td>
    <td class="${deepPainPct < 5 ? 'dp-green' : 'dp-red'}">
  ${deepPainPct.toFixed(2)}%
</td>
    <td>${actualRiders}</td>
    <td>${idleRider}</td>
    <td>${bf}</td>
    <td>${orderAttainment}%</td>
    <td>${deepPainCount}</td>
    <td>${additionalOrders}</td>
    <td>${actualDeepPain}</td>
  </tr>
`;

if (GROUP_1.includes(store)) {
  table1Rows += rowHTML;

  totals1.projectedFull += projectedFull;
  totals1.projectedTill += projectedTill;
  totals1.projectedBuffer += projectedBuffer;
  totals1.totalOrders += totalOrders;
  totals1.delivered += delivered;
  totals1.deepPainCount += Number(deepPainCount);
  totals1.additionalOrders += additionalOrders;
  totals1.actualRiders += actualRiders;
  totals1.idleRider += idleRider;

  cancelledPctArr1.push(cancelledPct);
  deepPainPctArr1.push(deepPainPct);
  orderAttainmentArr1.push(parseFloat(orderAttainment));
  actualDeepPainArr1.push(parseFloat(actualDeepPain));
  bfArr1.push(bf);

} else if (GROUP_2.includes(store)) {
  table2Rows += rowHTML;

  totals2.projectedFull += projectedFull;
  totals2.projectedTill += projectedTill;
  totals2.projectedBuffer += projectedBuffer;
  totals2.totalOrders += totalOrders;
  totals2.delivered += delivered;
  totals2.deepPainCount += Number(deepPainCount);
  totals2.additionalOrders += additionalOrders;
  totals2.actualRiders += actualRiders;
  totals2.idleRider += idleRider;

  cancelledPctArr2.push(cancelledPct);
  deepPainPctArr2.push(deepPainPct);
  orderAttainmentArr2.push(parseFloat(orderAttainment));
  actualDeepPainArr2.push(parseFloat(actualDeepPain));
  bfArr2.push(bf);
}
}

// build TOTAL row html
const totalRowHTML1 = `
<tr class="total-row">
  <td>Total</td>
  <td>${totals1.projectedFull}</td>
  <td>${totals1.projectedTill}</td>
  <td>${totals1.projectedBuffer}</td>
  <td>${totals1.totalOrders}</td>
  <td>${(cancelledPctArr1.reduce((a,b)=>a+b,0)/cancelledPctArr1.length || 0).toFixed(2)}%</td>
  <td>${totals1.delivered}</td>
  <td class="${
  ((deepPainPctArr1.reduce((a,b)=>a+b,0)/deepPainPctArr1.length) < 5)
  ? 'dp-green'
  : 'dp-red'
}">
  ${(deepPainPctArr1.reduce((a,b)=>a+b,0)/deepPainPctArr1.length || 0).toFixed(2)}%
</td>
  <td>${totals1.actualRiders}</td>
  <td>${totals1.idleRider}</td>
  <td>${(bfArr1.reduce((a,b)=>a+b,0)/bfArr1.length || 0).toFixed(2)}</td>
  <td>${(orderAttainmentArr1.reduce((a,b)=>a+b,0)/orderAttainmentArr1.length || 0).toFixed(2)}%</td>
  <td>${totals1.deepPainCount.toFixed(2)}</td>
  <td>${totals1.additionalOrders}</td>
  <td>${(actualDeepPainArr1.reduce((a,b)=>a+b,0)/actualDeepPainArr1.length || 0).toFixed(2)}%</td>
</tr>`;
const totalRowHTML2 = `
<tr class="total-row">
  <td>Total</td>
  <td>${totals2.projectedFull}</td>
  <td>${totals2.projectedTill}</td>
  <td>${totals2.projectedBuffer}</td>
  <td>${totals2.totalOrders}</td>
  <td>${(cancelledPctArr2.reduce((a,b)=>a+b,0)/cancelledPctArr2.length || 0).toFixed(2)}%</td>
  <td>${totals2.delivered}</td>
  <td class="${
  ((deepPainPctArr1.reduce((a,b)=>a+b,0)/deepPainPctArr1.length) < 5)
  ? 'dp-green'
  : 'dp-red'
}">
  ${(deepPainPctArr1.reduce((a,b)=>a+b,0)/deepPainPctArr1.length || 0).toFixed(2)}%
</td>
  <td>${totals2.actualRiders}</td>
  <td>${totals2.idleRider}</td>
  <td>${(bfArr2.reduce((a,b)=>a+b,0)/bfArr2.length || 0).toFixed(2)}</td>
  <td>${(orderAttainmentArr2.reduce((a,b)=>a+b,0)/orderAttainmentArr2.length || 0).toFixed(2)}%</td>
  <td>${totals2.deepPainCount.toFixed(2)}</td>
  <td>${totals2.additionalOrders}</td>
  <td>${(actualDeepPainArr2.reduce((a,b)=>a+b,0)/actualDeepPainArr2.length || 0).toFixed(2)}%</td>
</tr>`;


// -------- STEP 4: RENDER TWO TABLES --------
output.innerHTML = `
  <h3 style="margin-top:20px;">📍 Bangalore Dark Stores</h3>
  <button onclick="downloadTableImage('blrTable','Bangalore_Dark_Stores')" 
          style="margin-bottom:10px;">
    ⬇ Download Bangalore Table
  </button>

  <div id="blrTable">
    <table class="table table-bordered glass-table">
      <thead style="background:#003f8c; color:white;">
        <tr>
          <th>Store</th><th>Projected</th><th>Till Hour</th><th>Buffer</th>
          <th>Total</th><th>Cancelled %</th><th>Delivered</th><th>Deep Pain %</th>
          <th>Actual Riders</th><th>Idle Rider</th><th>BF</th>
          <th>Order Attainment %</th><th>DP Count</th><th>Additional</th><th>@Actual DP</th>
        </tr>
      </thead>
      <tbody>
        ${table1Rows}
        ${totalRowHTML1}
        ${watermarkRowHTML}
      </tbody>
    </table>
  </div>

  <h3 style="margin-top:30px;">📍 Hyderabad Dark Stores</h3>
  <button onclick="downloadTableImage('hydTable','Hyderabad_Dark_Stores')" 
          style="margin-bottom:10px;">
    ⬇ Download Hyderabad Table
  </button>

  <div id="hydTable">
    <table class="table table-bordered glass-table">
      <thead style="background:#003f8c; color:white;">
        <tr>
          <th>Store</th><th>Projected</th><th>Till Hour</th><th>Buffer</th>
          <th>Total</th><th>Cancelled %</th><th>Delivered</th><th>Deep Pain %</th>
          <th>Actual Riders</th><th>Idle Rider</th><th>BF</th>
          <th>Order Attainment %</th><th>DP Count</th><th>Additional</th><th>@Actual DP</th>
        </tr>
      </thead>
      <tbody>
        ${table2Rows}
        ${totalRowHTML2}
        ${watermarkRowHTML}
      </tbody>
    </table>
  </div>
`;


}

document.getElementById("finalTableBtn")?.addEventListener("click", generateFinalTable);


///
function downloadTableImage(elementId, fileName) {
  const element = document.getElementById(elementId);
  if (!element) return;

  html2canvas(element, { scale: 2 }).then(canvas => {
    const link = document.createElement("a");
    link.download = fileName + ".png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
}

/* ------------------ HOUR % LOGIC ------------------ */
function getHourPercentageFor(day, hour) {
  let idx = hour - 6;
  if (idx < 0) idx = 0;
  if (idx >= hourPercentages.length) idx = hourPercentages.length - 1;
  return hourPercentages[idx];
}

/* ------------------ PROJECTION TABLE ------------------ */
function generateSummaryTable() {
  const tbody = document.querySelector('#reportTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const today = getTodayDateString();
  const data = reportData.find(d => d.date === today) || reportData.at(-1);
  const stores = DARK_STORES;

  const now = new Date();
  const hourRow = getHourPercentageFor(getDayName(now), now.getHours());
  document.getElementById('tillHour').textContent = hourRow.hour;

  let t1=0,t2=0,t3=0;

  stores.forEach(s=>{
    const full = data.stores[s] ?? 0;
    const proj = Math.round(full * (hourRow[getDayName(now)]/100));
    const buf = Math.round(proj * 1.15);

    tbody.insertAdjacentHTML('beforeend',`
      <tr>
        <td>${s}</td>
        <td>${full}</td>
        <td>${proj}</td>
        <td>${buf}</td>
      </tr>
    `);

    t1+=full; t2+=proj; t3+=buf;
  });

  tbody.insertAdjacentHTML('beforeend',`
    <tr style="font-weight:bold;background:#ffe066">
      <td>Total</td><td>${t1}</td><td>${t2}</td><td>${t3}</td>
    </tr>
  `);
}

/* ------------------ FILE PROCESSING ------------------ */
function processFile() {
  const file = document.getElementById("fileInput")?.files[0];
  if (!file) return alert("Please select a file");

  const reader = new FileReader();
  reader.onload = e => {
    const wb = XLSX.read(
      file.name.endsWith(".csv") ? e.target.result : new Uint8Array(e.target.result),
      { type: file.name.endsWith(".csv") ? "string" : "array" }
    );

    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    aggregateOrders(data);
    generateSummaryPage();
  };

  file.name.endsWith(".csv") ? reader.readAsText(file) : reader.readAsArrayBuffer(file);
}

/* ------------------ AGGREGATION ------------------ */
function aggregateOrders(data) {
  const stores = DARK_STORES;

  AppState.summary = {};
DARK_STORES.forEach(s => {
  AppState.summary[s] = { t: 0, d: 0, a: 0, c: 0, dp: 0 };
});
  AppState.deepPain = [];
  AppState.deepPainDetails = [];

  data.forEach(o=>{
    const s = o["Store Name"]?.trim();

    AppState.summary[s] ??= {t:0,d:0,a:0,c:0,dp:0};
    AppState.summary[s].t++;

    const st = o["Order Status"]?.toLowerCase();
    const b = o["Breached"]?.toLowerCase()==="yes";
    const m = +o["Breached Duration (In Min)"]||0;

    if (st==="delivered") {
      AppState.summary[s].d++;
      if (b && m>15) {
        AppState.summary[s].dp++;
        AppState.deepPain.push(o);
        AppState.deepPainDetails.push(o);
      }
    }
    else if (st==="attempted") AppState.summary[s].a++;
    else if (st?.includes("cancel")) AppState.summary[s].c++;
  });
}

/* ------------------ SUMMARY TABLE ------------------ */
function generateSummaryPage() {
  const out = document.getElementById("output");
  let html=`<table class="table table-bordered" id="summaryTable">
  <thead><tr>
  <th>Store</th><th>Total</th><th>Cancelled</th><th>Cancelled %</th>
  <th>Delivered</th><th>Attempted</th><th>Deep Pain</th><th>Deep Pain %</th>
  <th>Actual Riders</th><th>Idle Rider</th><th>BF</th></tr></thead><tbody>`;

  Object.entries(AppState.summary).forEach(([s,v],i)=>{
    const cp=((v.c+v.a)/v.t*100||0).toFixed(2);
    const dp=(v.dp/v.d*100||0).toFixed(2);
    html+=`
      <tr>
        <td>${s}</td><td>${v.t}</td><td>${v.c}</td><td>${cp}%</td>
        <td>${v.d}</td><td>${v.a}</td><td>${v.dp}</td><td>${dp}%</td>
        <td><input class="summary-input"></td>
        <td><input class="summary-input"></td>
        <td><input class="summary-input"></td>
      </tr>`;
  });

  html+=`</tbody></table>`;
  out.innerHTML=html;
  document.getElementById("finalTableBtn").style.display="inline-block";
}

/* ------------------ INIT ------------------ */
document.addEventListener("DOMContentLoaded",()=>{
  generateSummaryTable();
  setInterval(generateSummaryTable,60000);
  document.getElementById("submitBtn")?.addEventListener("click",processFile);
});
