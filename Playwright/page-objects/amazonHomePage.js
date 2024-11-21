export class amazonHomePage {
  constructor(page) {
    this.page = page;
    this.url = page.goto("https://www.amazon.com/");
    this.mainSearchBox = page.getByPlaceholder("Search Amazon");
    this.shippingWarningButton = page.getByRole("button", { name: "Submit" });
    this.allCategoriesLink = page.getByLabel("Open All Categories Menu");
    this.allElectronicsProductsLink = page.getByRole("link", {
      name: "Electronics",
    });
    this.mainSearchBoxSubmitButton = page.locator(
      "//input[@id='nav-search-submit-button']"
    );
  }
  async navigateToAmazonHomePage() {
    await this.url;
  }
  async ensureHomePageLoadsSuccessfully() {
    // Sometimes Amazon home page loads weird with no elements. Refresh solves that problem.
    !(await this.mainSearchBox.first().isVisible()) &&
      (await this.page.reload());
    // On home page user is warned that the only products delivered to Uk are shown. Simply ignore this warning.
    (await this.shippingWarningButton.first().isVisible()) &&
      (await this.shippingWarningButton.first().click());
  }
  async searchByDepartment() {
    await this.allCategoriesLink.click();
    await this.allElectronicsProductsLink.click();
    await this.page.waitForTimeout(2000);
  }
  async searchProductFromSearchBox(productName) {
    await this.mainSearchBox.click();
    await this.mainSearchBox.fill(productName);
    await this.mainSearchBoxSubmitButton.click();
  }
}
