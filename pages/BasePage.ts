import { Page, test } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(navigateTo: string = "") {
    await this.page.goto(navigateTo);
  }

  protected getScreenshotFolder(): string {
    return this.constructor.name;
  }

  async takeScreenshot(fullPage: boolean = true) {
    const testInfo = test.info();
    const fileName = testInfo.title.replace(/[^a-z0-9]/gi, "-").toLowerCase();
    const folder = this.getScreenshotFolder();
    await this.page.screenshot({ path: `screenshots/${folder}/${fileName}.png`, fullPage: fullPage });
  }
}
