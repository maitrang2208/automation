

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

  await administrationPage.clickTopBarItem("Nationalities");   // click on nationalities
  await expect( administrationPage.headerNationalityName.getByText("Nationalities")).toBeVisible();
 })
 

 test("1/ create nationality sucessfully", async ({administrationPage,}) => {
  // click on add button
  await administrationPage.addbtn.click();
  await expect(administrationPage.h6Text.getByText("Add Nationality")).toBeVisible();
  await administrationPage.txtNationalityName.fill(`${randomName()}`);
  const newNationName = await administrationPage.txtNationalityName.inputValue();
  await administrationPage.saveButton.click();
  // verify the new nationality is added
  await expect(administrationPage.headerNationalityName.getByText("Nationalities")).toBeVisible({ timeout: 15000 });
  const result = await administrationPage.checkNationalityAdded(newNationName);
  expect(result).toBe(true); // Assert the result

});

test("2/Login and create nationality and delete natoionality", async ({administrationPage,}) => {
  //click on add button
  await administrationPage.addbtn.click();
  await expect(administrationPage.h6Text.getByText("Add Nationality")).toBeVisible();
  await administrationPage.txtNationalityName.fill(`${randomName()}`);
  const newNationName = await administrationPage.txtNationalityName.inputValue();
  await administrationPage.saveButton.click();
  // verify the new nationality is added
  await expect(administrationPage.headerNationalityName).toBeVisible({ timeout: 20000 });
  const result = await administrationPage.checkNationalityAdded(newNationName);
  expect(result).toBe(true); // Assert the result
  //delete
  await administrationPage.delbtn(newNationName).click();
  expect(administrationPage.delDialog).toBeVisible({ timeout: 15000 });
  expect(administrationPage.delText).toHaveText('The selected record will be permanently deleted. Are you sure you want to continue?')
  await administrationPage.btnDelete.click();
  await administrationPage.tableNationality.waitFor({ state: 'visible' ,timeout: 15000});
  const isDeleted = await administrationPage.checkNationalityAdded(newNationName);
  expect(isDeleted).toBe(false); //
//delete nationality

});
test("3/Login and create nationality and edit natoionality", async ({loginPage,administrationPage,}) => {
  //click on add button
  await administrationPage.addbtn.click();
  await expect(administrationPage.h6Text.getByText("Add Nationality")).toBeVisible();
  await administrationPage.txtNationalityName.fill(`${randomName()}`);
  const newNationName = await administrationPage.txtNationalityName.inputValue();
  await administrationPage.saveButton.click();
  // verify the new nationality is added
  await expect(administrationPage.headerNationalityName).toBeVisible({ timeout: 20000 });
  const result = await administrationPage.checkNationalityAdded(newNationName);
  expect(result).toBe(true); 
  // Edit nationality
  await administrationPage.editbtn(newNationName).click();
  await expect(administrationPage.headerEditNationality).toBeVisible({ timeout: 15000 });
  await administrationPage.txtNationalityName.waitFor({ state: 'visible', timeout: 15000 });
  await expect(administrationPage.txtNationalityName).toHaveValue(newNationName);
  const updatedNationName = `${newNationName} - Updated`;
  await administrationPage.txtNationalityName.fill(updatedNationName);
  await administrationPage.saveButton.click();
  // Verify
  await administrationPage.tableNationality.waitFor({ state: 'visible', timeout: 15000 });
  await expect(administrationPage.headerNationalityName).toBeVisible({ timeout: 15000 });
  await administrationPage.checkNationalityAdded(updatedNationName);
  
 
//edit nationality

});

});
