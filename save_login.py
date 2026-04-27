from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto("https://products.loginextsolutions.com/product/#/live")

    input("After you login in the browser, come back here and press Enter...")

    context.storage_state(path="session.json")
    browser.close()
