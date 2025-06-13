import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { AdministrationPage } from "../pages/Administration";
export class PageFactory {
    //login page
    static createLoginPage(page: Page){
        return new LoginPage(page);
    }

    static createAdministrationPage(page: Page){
        return new AdministrationPage(page);
    }
}
