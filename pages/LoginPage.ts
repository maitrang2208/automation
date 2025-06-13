import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly LoginButton: Locator;
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole("textbox", { name: "username" });
        this.passwordInput = page.getByRole("textbox", { name: "password" });
        this.LoginButton = page.getByRole("button", { name: "Login" });
    }
    async navigateToLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
  }

    async login(username: string, password: string) {
        
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.LoginButton.click();
    }
    
}