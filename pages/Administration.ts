import { Page, Locator, expect, test as baseTest } from "@playwright/test";
import { randomName } from "../utils/helper";
import { faker } from '@faker-js/faker';

export class AdministrationPage {
  readonly Sidepanel: Locator;
  readonly header: Locator;
  readonly topBar: Locator;
  readonly menuTopBar: Locator;
  readonly addbtn: Locator;
  readonly orangehrmMainTitle: Locator;
  readonly saveButton: Locator;
  readonly txtNationalityName: Locator;
  readonly headerNationalityName: Locator;
  readonly headerUserManagement: Locator;
  readonly pageNumber: Locator;
  readonly pagination: Locator;
  readonly nationalityNameList: Locator;
  readonly tableNationality: Locator;
  readonly delbtn: (name: string) => Locator;
  readonly delDialog: Locator;
  readonly delText: Locator;
  readonly btnDelete: Locator;
  readonly editbtn: (name: string) => Locator;
  readonly headerEditNationality: Locator;

  //userManagement
  readonly h5UserManagementHeader: Locator;
  readonly menuUserManagement: Locator;
  readonly drpUserRole: Locator;
  readonly optAdmin: Locator;
  readonly optESS: Locator;
  readonly drpStatus: Locator;
  readonly optEnable: Locator;
  readonly optDisable: Locator;
  readonly txtEmployeeName: Locator;
  readonly optEmployeeName: Locator;
  readonly txtUserName: Locator;
  readonly userName: string
  readonly txtPassword: Locator;
  readonly txtConfirmPassword: Locator;




  constructor(page: Page) {
    this.Sidepanel = page.locator(".oxd-main-menu-item-wrapper span");
    this.header = page.locator(".oxd-topbar-header-breadcrumb-module");
    this.topBar = page.locator(".oxd-topbar-body-nav-tab-item");
    this.menuTopBar = page.locator(".oxd-dropdown-menu").getByRole("menuitem");
    this.addbtn = page.getByRole("button", { name: "Add" });

    this.orangehrmMainTitle = page.locator(".orangehrm-main-title");
    this.saveButton = page.locator('button[type="submit"]');

    //Nationalities
    this.txtNationalityName = page.locator(".oxd-input-group").getByRole("textbox");
    this.headerNationalityName = page.getByRole("heading", { name: "Nationalities" });

    this.headerUserManagement = page.locator(".oxd-table-filter-header-title");

    this.pageNumber = page.locator(".oxd-pagination-page-item--page");
    this.pagination = page.locator(".oxd-pagination__ul");
    this.nationalityNameList = page.locator(".oxd-padding-cell:nth-child(2)");
    this.tableNationality = page.locator(".oxd-table-body");
    this.delbtn = (name: string) => page.getByRole("row", { name: name }).getByRole("button").locator(".bi-trash");
    this.delDialog = page.locator(".orangehrm-dialog-popup");
    this.delText = page.locator(".orangehrm-text-center-align");
    this.btnDelete = page.getByRole("button", { name: " Yes, Delete " });
    this.editbtn = (name: string) => page.getByRole("row", { name: name }).getByRole("button").locator(".bi-pencil-fill");
    this.headerEditNationality = page.getByRole("heading", { name: "Edit Nationality" });

    //User Management
    this.h5UserManagementHeader = page.getByRole("heading", { name: "System Users" });
    this.menuUserManagement = page.getByRole("listitem").filter({ hasText: "User Management" });
    this.drpUserRole = page.locator(".oxd-input-group").filter({ hasText: "User Role" }).locator(".oxd-select-text-input");
    this.optAdmin = page.getByRole("option", { name: "Admin" });
    this.optESS = page.getByRole("option", { name: "ESS" });

    this.drpStatus = page.locator(".oxd-input-group").filter({ hasText: "Status" }).locator(".oxd-select-text-input");
    this.optEnable = page.getByRole("option", { name: "Enabled" });
    this.optDisable = page.getByRole("option", { name: "Disabled" });
    this.txtEmployeeName = page.locator(".oxd-input-group").filter({ hasText: "Employee Name" }).getByRole("textbox");
    this.optEmployeeName = page.getByRole("option", { name: "Yousef Omer Kmail" });
    this.txtUserName= page.locator(".oxd-input-group").filter({ hasText: "Username" }).locator(".oxd-input");
    this.userName = faker.internet.userName();
    this.txtPassword= page.locator('.oxd-input-group').filter({ hasText: 'Password' }).nth(0).locator('.oxd-input')
    this.txtConfirmPassword= page.locator(".oxd-input-group").filter({ hasText: "Confirm Password" }).locator(".oxd-input");

  }

  async navigateToMenu(setionName: string) {
    await this.Sidepanel.getByText(setionName).click();
    await expect(this.Sidepanel.getByText(setionName)).toBeVisible();
  }

  async clickTopBarItem(itemName: string, menuName?: string) {
    await this.topBar.getByText(itemName, { exact: true }).click();

    if (menuName) {
      await this.menuTopBar.getByText(menuName, { exact: true }).click();
    }
  }

  // Calculate total pages in a paginated list
  async getTotalPages() {
    if ((await this.pagination.isVisible()) === true) {
      const totalPageNumber = await this.pageNumber.last().textContent();
      return Number(totalPageNumber);
    }
    return 1; // Default to 1 if no pagination or only one page
  }

  async checkNationalityAdded(nameNation: string) {
    const lengthPage = await this.getTotalPages();

    for (let i = 0; i < lengthPage; i++) {
      await this.tableNationality.waitFor({ state: "visible" });

      console.log(`Checking page ${i + 1}`);
      const element = this.nationalityNameList.filter({ hasText: nameNation });
      //const element = this.nationalityNameList.toContainText(nameNation);

      if (await element.isVisible()) {
        console.log(`Found ${nameNation} on page ${i + 1}`);
        return true; // Exit the loop if found
      } else if (i < lengthPage - 1) {
        await this.pagination.getByRole("button", { name: String(i + 2) }).click();
      }
    }
    console.log("nation is not found");
    return false;
    // If not found after checking all pages
  }
}
