import { test, expect } from "@playwright/test";
import { LandingPage } from "../pages/LandingPage";
import { fieldTestCases, validDefaults } from "../data/landing-page.data";

test.describe("Landing Page - Contact Form", () => {

  test.describe("Happy Path", () => {
    test("should submit successfully with valid data", async ({ page }) => {
      const landingPage = new LandingPage(page);
      await landingPage.navigate();

      await landingPage.fillForm(validDefaults);
      await landingPage.takeScreenshot();
      await landingPage.submit();

      await expect(page).toHaveURL(/thank-you/);
      console.log('Reached the thank you page');
    });
  });

  test.describe("Field Validation", () => {
    for (const testCase of fieldTestCases) {
      test(testCase.description, async ({ page }) => {
        const landingPage = new LandingPage(page);
        await landingPage.navigate();

        const formData = {
          ...validDefaults,
          [testCase.field]: testCase.value,
        };

        await landingPage.fillForm(formData);
        // await landingPage.takeScreenshot(); // uncomment if you want to see screenshot for each tests
        await landingPage.submit();

        if (testCase.expectedValid) {
          await expect(page).toHaveURL(/thank-you/);
        } else {
          await expect(page).not.toHaveURL(/thank-you/);
        }
      });
    }
  });
});
