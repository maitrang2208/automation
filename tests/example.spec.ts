import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page).toHaveTitle('OrangeHRM');
  // Expect a title "to contain" a substring.
 // await expect(page).toHaveTitle(/Playwright/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
