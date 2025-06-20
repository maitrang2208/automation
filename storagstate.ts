import { Page, chromium, expect } from "@playwright/test";
import { PageFactory } from "./factories/page-factory";
import path from "path";

const authFile = "./.auth/user.json";

export async function loginAndStorageState() {


  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  const buildStorageStatePath=await page.context().storageState({ path: authFile });

  const loginPage = PageFactory.createLoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.usernameInput.fill(process.env.TEST_USERNAME);
  await loginPage.passwordInput.fill(process.env.TEST_PASSWORD);
  await loginPage.LoginButton.click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(process.env.BASE_URL);
  await expect(page).toHaveTitle("OrangeHRM");
  
 // Save authentication state
  await page.context().storageState({ path: authFile });

  await context.close();
  await browser.close();

  return authFile
}
