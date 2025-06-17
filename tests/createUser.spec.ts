

// tests/login.spec.ts// ← Uses extended test
import { test } from "../fixtures/base-fixtures";
import { expect } from "playwright/test";
import { randomName } from "../utils/helper";
import { LoginPage } from '../pages/LoginPage';



test.describe("Create Nationality Tests", () => {
 
//  test.beforeAll(async ({ loginPage, administrationPage }) => {
//    await loginPage.navigateToLoginPage();
//    await loginPage.login("Admin", "admin123");
//    await expect(loginPage.page).toHaveTitle("OrangeHRM");

//  });

 test.beforeEach(async ({ loginPage,administrationPage }) => {

  await loginPage.navigateToLoginPage();
  await loginPage.login("Admin", "admin123");
  await expect(loginPage.page).toHaveTitle("OrangeHRM");
  await administrationPage.navigateToSection("Admin");   //Go to Administration section
  await expect(administrationPage.header.getByText("Admin")).toBeVisible();

  await administrationPage.clickTopBarItem("User Management","Users");   // click on nationalities
  await expect( administrationPage.h5UserManagementHeader).toBeVisible({timeout:5000});
 })
 

 test("1/ create nationality sucessfully", async ({administrationPage,}) => {
  // click on add button
  await administrationPage.addbtn.click();
  await expect(administrationPage.h6Text.getByText("Add User")).toBeVisible();

});

});
