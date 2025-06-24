import { Page, chromium, expect } from "@playwright/test";
import { PageFactory } from "./factories/page-factory";
import fs from "fs";
const authFile = "./.auth/user.json";

export async function loginAndStorageState() {
  const browser = await chromium.launch({ headless: true });

  // Check if the auth file exists
  if (fs.existsSync(authFile)) {
    console.log("load session từ auth.json");
    const context = await browser.newContext({ storageState: authFile });
    const page = await context.newPage();
    //check if the session is still valid
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/admin/nationality");

    if (!page.url().includes("login")) {
      console.log("Session is still valid, no need to login again.");
      await context.close();
      await browser.close();

      return authFile;
    }
    console.log("Session is invalid, proceeding with login.");
    await context.close();
  }
  //No auth file found or session is invalid, proceed with login
  console.log("Proceeding with login...");
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  const loginPage = PageFactory.createLoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.usernameInput.fill(process.env.TEST_USERNAME);

  await loginPage.passwordInput.fill(process.env.TEST_PASSWORD);
  await loginPage.LoginButton.click();
  //verify login success
  await expect(page).toHaveTitle("OrangeHRM");
  //save authentication state
  await page.context().storageState({ path: authFile });

  //close context and browser
  await context.close();
  await browser.close();

  return authFile;
}
