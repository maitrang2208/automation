// import { test, expect, Page } from '@playwright/test';
// test('has title', async ({ page }) => {
//     await page.goto('https://omniaqapreprod.omniatestcloud.net/');

//     // Fill login form
//     await page.getByRole("textbox", { name: "Username" }).fill('ominatesting');
//     await page.getByRole("button", { name: "Next" }).click();

//     // Wait for password field to appear
//     await page.getByRole("textbox", { name: "Password" }).waitFor();
//     await page.getByRole("textbox", { name: "Password" }).fill('22082001tmdt@');

//     // Click login button - you were missing the click() action
//     await page.getByRole("button", { name: "Login" }).click();

//     console.log('Filled login credentials');

//     // Add verification after login
//     //await expect(page).toHaveURL(/dashboard/); // Adjust URL pattern as needed
//     // Or verify some element that appears after login
//     // await expect(page.getByText('Welcome')).toBeVisible();
// });

//-------
// import { test, expect } from "@playwright/test";
// import { PageFactory } from "../pages/factories/page-factory";

// test('Login Test', async ({ page }) => {
//    // await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
//     const loginPage=PageFactory.createLoginPage(page)
//     await loginPage.login('Admin','admin123');
//     await expect(page).toHaveTitle('OrangeHRM');

// })

//-----------

// tests/login.spec.ts// ← Uses extended test
import { test } from "../fixtures/base-fixtures";
import { expect } from "playwright/test";
import { randomName } from "../utils/helper";


test("1/ Login and create nationality", async ({loginPage}) => {
  await loginPage.navigateToLoginPage();
  await loginPage.login("Admin", "admin123");
  await expect(loginPage.page).toHaveTitle("OrangeHRM");
});

