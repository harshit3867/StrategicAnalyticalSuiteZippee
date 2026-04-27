from playwright.sync_api import sync_playwright
import os

DOWNLOAD_SAVE_PATH = r"C:\Users\saini\Downloads\OrderReport.zip"

with sync_playwright() as p:

    browser = p.chromium.launch(headless=True, args=["--no-sandbox"])
    context = browser.new_context(storage_state="session.json")
    page = context.new_page()

    # OPEN ORDERS PAGE
    page.goto("https://products.loginextsolutions.com/product/#/order")
    page.wait_for_load_state("networkidle")

    # ========== SELECT LAST 30 DAYS ==========
    page.click("#orderListDateRange-input")
    page.click("text=Last 30 Days")
    page.wait_for_timeout(1200)

    # ========== CLICK DOWNLOAD ICON (JS) ==========
    page.evaluate("""
        const buttons = document.querySelectorAll('button');
        for (const b of buttons) {
            if (b.innerHTML.toLowerCase().includes('download')) {
                b.click();
                break;
            }
        }
    """)

    page.wait_for_timeout(1500)   # wait for popup

    # ========== CLICK ORDERS BUTTON INSIDE POPUP ==========
    # (IMPORTANT: Target popup button only)
    popup_orders_btn = page.locator("#OrderList-DownloadModal-button-OrderReport")

    print("📥 Waiting for report download to start...")

    with page.expect_download(timeout=180000) as dl:   # wait up to 3 minutes
        popup_orders_btn.click()

    download = dl.value
    download.save_as(DOWNLOAD_SAVE_PATH)

    print("✅ Download completed and saved at:")
    print(DOWNLOAD_SAVE_PATH)

    browser.close()

