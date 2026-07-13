import { BasePage } from "./BasePage";
import { Locator, Page } from "@playwright/test";

export class LandingPage extends BasePage {
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly companyInput: Locator;
  readonly websiteInput: Locator;
  readonly employeesSelect: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.nameInput = page.locator("#name");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.companyInput = page.locator("#company");
    this.websiteInput = page.locator("#website");
    this.employeesSelect = page.locator("#employees");
    this.submitButton = page.getByRole('button', { name: 'Request a call back' });
  }

}
