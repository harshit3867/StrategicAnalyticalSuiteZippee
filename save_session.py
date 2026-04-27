from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()

    page.goto("https://products.loginextsolutions.com/login")

    input("👉 Log in manually in the browser, then press ENTER here...")

    context.storage_state(path="session.json")
    browser.close()
