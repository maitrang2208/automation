import { test as baseTest } from '@playwright/test';
import { PageFactory } from '../factories/page-factory';

// tests/base-test.ts

export const test = baseTest.extend<{
    loginPage: ReturnType<typeof PageFactory.createLoginPage>;
    administrationPage: ReturnType<typeof PageFactory.createAdministrationPage>;
  
}>({
    loginPage: async ({ page }, use) =>
    {
    const loginPage = PageFactory.createLoginPage(page);
    await use(loginPage); // ← Injects into tests
    },

    administrationPage: async ({ page }, use) =>
    {
        const administrationPage = PageFactory.createAdministrationPage(page);
        await use(administrationPage); // ← Injects into tests
    }
    
});

export default test;