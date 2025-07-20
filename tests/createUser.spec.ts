// tests/login.spec.ts// ← Uses extended test
import { test } from "../fixtures/base-fixtures";
import { expect } from "playwright/test";
import { randomName } from "../utils/helper";
import { LoginPage } from "../pages/LoginPage";
import { loginAndStorageState } from "../storagstate";

test.describe("Create Nationality Tests", () => {
  test.use({ storageState: async ({}, use) => use(await loginAndStorageState()) });
  //  test.beforeAll(async ({ loginPage, administrationPage }) => {
  //    await loginPage.navigateToLoginPage();
  //    await loginPage.login("Admin", "admin123");
  //    await expect(loginPage.page).toHaveTitle("OrangeHRM");

  //  });

  test.beforeEach(async ({ loginPage, administrationPage }) => {
    await loginPage.navigateToLoginPage();
    await expect(loginPage.page).toHaveTitle("OrangeHRM");
    await administrationPage.navigateToMenu("Admin"); //Go to Administration section
    await expect(administrationPage.header.getByText("Admin")).toBeVisible();

    await administrationPage.clickTopBarItem("User Management", "Users"); // click on nationalities
    await expect(administrationPage.h5UserManagementHeader).toBeVisible({
      timeout: 5000,
    });
  });

  test("1/ create nationality sucessfully", async ({ administrationPage }) => {
    await test.step("Click on Add button ", async () => {
      await administrationPage.addbtn.click();
      await expect(administrationPage.orangehrmMainTitle.getByText("Add User")).toBeVisible();
    });
    await test.step("Select User Role as ESS", async () => {
      await administrationPage.drpUserRole.click();
      await administrationPage.optESS.click();
      await expect(administrationPage.drpUserRole).toHaveText("ESS");
    });
    await test.step('Select Status as "Enabled"', async () => {
      await administrationPage.drpStatus.click();
      await administrationPage.optEnable.click();
      await expect(administrationPage.drpStatus).toHaveText("Enabled");
    });

    await test.step("Enter Employee Name", async () => {
      await administrationPage.txtEmployeeName.fill("Yousef Omer Kmail");
      await administrationPage.optEmployeeName.click();
      await expect(administrationPage.txtEmployeeName).toHaveValue("Yousef Omer Kmail");
    });
    await test.step("Enter Username", async () => {
      await administrationPage.txtUserName.fill(administrationPage.userName);
      await expect(administrationPage.txtUserName).toHaveValue(administrationPage.userName);
    });
    await test.step("Enter Password and Confirm Password", async () => {
      await administrationPage.txtPassword.fill(administrationPage.userName);
      await expect(administrationPage.txtPassword).toHaveValue(administrationPage.userName);
      const password = await administrationPage.txtPassword.inputValue();
      await administrationPage.txtConfirmPassword.fill(password);
      await expect(administrationPage.txtConfirmPassword).toHaveValue(password);
    });
    await test.step("Click Save button", async () => {
      await administrationPage.saveButton.click();
      await expect(administrationPage.h5UserManagementHeader).toBeVisible();
    });
  });
});
