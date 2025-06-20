import { test as setup, expect } from '@playwright/test';
import path from 'path';
import { PageFactory } from '../factories/page-factory';
import { LoginPage } from '../pages/LoginPage';

const authFile = './.auth/user.json';


setup('authenticate', async ({ page }) => {
  const loginPage = PageFactory.createLoginPage(page);
  // Perform authentication steps. Replace these actions with your own.
  await loginPage.usernameInput.fill(process.env.TEST_USERNAME);
  await loginPage.passwordInput.fill(process.env.TEST_PASSWORD);
  await loginPage.LoginButton.click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL(process.env.BASE_URL);
  await expect(page).toHaveTitle('OrangeHRM')
   
  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});