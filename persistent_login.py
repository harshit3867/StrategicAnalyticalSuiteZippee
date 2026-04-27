from playwright.sync_api import sync_playwright

USER_DATA = r"C:\Users\saini\OneDrive\Desktop\ZP_prj\login_profile"

with sync_playwright() as p:
    # persistent browser profile
    context = p.chromium.launch_persistent_context(
        user_data_dir=USER_DATA,
        headless=False
    )

    page = context.new_page()

    page.goto("https://products.loginextsolutions.com/login")

    input("👉 Log in manually fully, reach dashboard, then press ENTER here...")

    print("🎉 Profile saved. You will not need to log in again.")
