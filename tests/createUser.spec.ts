

// tests/login.spec.ts// ← Uses extended test
import {test} from '../fixtures/base-fixtures';
import { expect } from "playwright/test";
import { randomName } from '../utils/helper';
test('Login and create nationality', async ({ loginPage, administrationPage}) => {
  await loginPage.navigateToLoginPage();
  await loginPage.login('Admin', 'admin123');
  await expect(loginPage.page).toHaveTitle('OrangeHRM'); // Adjust URL pattern as needed   
  await administrationPage.navigateToSection('Admin');
  await expect(administrationPage.header.getByText("Admin")).toBeVisible();
  await administrationPage.clickTopBarItem('User Management','Users');
  await expect(administrationPage.headerUserManagement.getByText('System Users')).toBeVisible();


//   await administrationPage.addbtn.click();
//   await expect(administrationPage.h6Text.getByText('Add User')).toBeVisible();

await administrationPage.getTotalPages().then(async (totalPages) => {
  console.log(`Total pages: ${totalPages}`)})

});

//storage login
