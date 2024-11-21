export class gamingKeyboardsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getAllCategoriesLink = page.getByLabel("Open All Categories Menu");
    this.expandAllCategoriesLink = page.getByLabel("See all").first();
    this.videoGamesLink = page.getByRole("link", { name: "Video Games" });
    this.pcLink = page.getByRole("link", { name: "PC" }).first();
    this.pcAccessoriesLink = page.getByRole("link", { name: "PC Accessories" });
    this.pcGamingKeyboardsLink = page.getByRole("link", {
      name: "PC Gaming Keyboards",
    });
    this.sortByDropdown = page.locator("//span[@id='a-autoid-0-announce']");
    this.priceFilterFromHighToLow = page.locator(
      "//a[@id='s-result-sort-select_2']"
    );
  }

  async filterByProduct(productFilter) {
    await this.getAllCategoriesLink.click();
    await this.expandAllCategoriesLink.click({ force: true });
    await this.videoGamesLink.click({ force: true });
    await this.pcLink.click({ force: true });
    await this.pcAccessoriesLink.click({ force: true });
    await this.pcGamingKeyboardsLink.click({ force: true });
    await this.page.getByLabel(productFilter).click();
    await this.sortByDropdown.click();
    await this.priceFilterFromHighToLow.hover();
    await this.priceFilterFromHighToLow.click();
  }

  async getProducts() {
    const productPrices = await this.page.$$eval(
      ".s-card-container > .a-section",
      (all_products) => {
        const prices = [];
        all_products.forEach((product) => {
          const priceEl = product.querySelector(".a-offscreen");
          const priceE2 = product.querySelector(".a-color-base");
          const priceInUSDollars = priceEl
            ? priceEl.innerText
            : priceE2.innerText;

          if (priceInUSDollars.substring(0, 1) == "$") {
            prices.push({ priceInUSDollars });
          }
        });
        console.log(prices);
        return prices;
      }
    );
    return productPrices;
  }

  isDescendingPrice(productPrices) {
    for (let i = 0; i < productPrices.length - 1; i++) {
      if (productPrices[i] > productPrices[i + 1]) {
        return false;
      }
    }
    return true;
  }

  formatPriceStringToNumber(productPrices) {
    Array.from(productPrices).forEach((element) => {
      const dollarSignRemoved = element.priceInUSDollars.substring(1);
      element.priceInUSDollars = Number(dollarSignRemoved);
    });
    return productPrices;
  }
}
