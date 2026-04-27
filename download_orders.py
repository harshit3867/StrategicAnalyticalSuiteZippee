import re
from playwright.sync_api import Playwright, sync_playwright, expect


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://products.loginextsolutions.com/login")
    page.locator("#username").click()
    page.locator("#username").fill("Centralreporting1@zfwhospitality.com")
    page.locator("#username").press("Tab")
    page.locator("#password").fill("Reporting@123")
    page.get_by_role("button", name="Log In").click()
    page.goto("https://products.loginextsolutions.com/product/#/live")
    page.get_by_role("link", name="Order ").click()
    page.get_by_role("link", name="All Orders").click()
    page.locator("#orderListDateRange-input").click()
    page.get_by_text("Last 30 Days").click()
    page.locator("#download").click()
    page.get_by_role("button", name=" Orders").click()
    page.locator(".sc-fznWOq.jJCmeT").click()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
