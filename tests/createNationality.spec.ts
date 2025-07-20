// tests/login.spec.ts// ← Uses extended test
import { test } from "../fixtures/base-fixtures";
import { expect } from "playwright/test";
import { randomName } from "../utils/helper";
import { LoginPage } from "../pages/LoginPage";
import { loginAndStorageState } from "../storagstate";


//test.use({ storageState: ".auth/user.json" })
test.describe("Create Nationality Tests", () => {
  test.use({ storageState: async ({}, use) => use(await loginAndStorageState()) });
  //  test.beforeAll(async ({ loginPage, administrationPage }) => {
  //    await loginPage.navigateToLoginPage();
  //    await loginPage.login("Admin", "admin123");
  //    await expect(loginPage.page).toHaveTitle("OrangeHRM");

  //  });

  test.beforeEach(async ({ loginPage, administrationPage }) => {
    await loginPage.navigateToLoginPage();
    //await loginPage.login('Admin', 'admin123');
    await expect(loginPage.page).toHaveTitle("OrangeHRM");
    await administrationPage.navigateToMenu("Admin"); //Go to Administration section
    await expect(administrationPage.header.getByText("Admin")).toBeVisible();

    await administrationPage.clickTopBarItem("Nationalities"); // click on nationalities
    await expect(administrationPage.headerNationalityName.getByText("Nationalities")).toBeVisible({ timeout: 5000 });
  });

  test("1/ create nationality sucessfully", async ({ administrationPage }) => {
    await test.step("Click on Add button )", async () => {
      await administrationPage.addbtn.click();
      await expect(administrationPage.orangehrmMainTitle.getByText("Add Nationality")).toBeVisible();
    });
    await test.step("Fill in the nationality name and verify that the nationality is created", async () => {
      await administrationPage.txtNationalityName.fill(`${randomName()}`);
      const newNationName = await administrationPage.txtNationalityName.inputValue();
      await administrationPage.saveButton.click();
      await expect(administrationPage.headerNationalityName).toBeVisible();
      const result = await administrationPage.checkNationalityAdded(newNationName);
      expect(result).toBe(true);
    });
  });

  test("2/Login and create nationality and delete nationality", async ({ administrationPage }) => {
    let newNationName: string;

    await test.step("Click on Add button )", async () => {
      await administrationPage.addbtn.click();
      await expect(administrationPage.orangehrmMainTitle.getByText("Add Nationality")).toBeVisible();
    });
    await test.step("Fill in the nationality name and verify that the nationality is created", async () => {
      await administrationPage.txtNationalityName.fill(`${randomName()}`);
      newNationName = await administrationPage.txtNationalityName.inputValue();
      await administrationPage.saveButton.click();
      await expect(administrationPage.headerNationalityName).toBeVisible();
      const result = await administrationPage.checkNationalityAdded(newNationName);
      expect(result).toBe(true);
    });
    await test.step("Delete the newly nationality has created", async () => {
      await administrationPage.delbtn(newNationName).click();
      expect(administrationPage.delDialog).toBeVisible();
      expect(administrationPage.delText).toHaveText("The selected record will be permanently deleted. Are you sure you want to continue?");
      await administrationPage.btnDelete.click();
      await administrationPage.tableNationality.waitFor({ state: "visible" });
      const isDeleted = await administrationPage.checkNationalityAdded(newNationName);
      expect(isDeleted).toBe(false);
    });
  });

  test("3/Login and create nationality and edit natoionality", async ({ loginPage, administrationPage }) => {
    let newNationName: string;
    let updatedNationName: string;
    //click on add button
    await test.step("Click on Add button )", async () => {
      await administrationPage.addbtn.click();
      await expect(administrationPage.orangehrmMainTitle.getByText("Add Nationality")).toBeVisible();
    });
    await test.step("Fill in the nationality name and verify that the nationality is created", async () => {
      await administrationPage.txtNationalityName.fill(`${randomName()}`);
      newNationName = await administrationPage.txtNationalityName.inputValue();
      await administrationPage.saveButton.click();
      await expect(administrationPage.headerNationalityName).toBeVisible();
      const result = await administrationPage.checkNationalityAdded(newNationName);
      expect(result).toBe(true);
    });
    await test.step("Edit the nationality ", async () => {
      await administrationPage.editbtn(newNationName).click();
      await expect(administrationPage.headerEditNationality).toBeVisible();
      await administrationPage.txtNationalityName.waitFor({ state: "visible" });
      await expect(administrationPage.txtNationalityName).toHaveValue(newNationName);
      updatedNationName = `${newNationName} - Updated`;
      await administrationPage.txtNationalityName.fill(updatedNationName);
      await administrationPage.saveButton.click();
    });
    // Edit nationality
    await test.step("Verify the nationality is successfully updated", async () => {
      await administrationPage.tableNationality.waitFor({ state: "visible" });
      await expect(administrationPage.headerNationalityName).toBeVisible();
      await administrationPage.checkNationalityAdded(updatedNationName);
    });
  });
});
