export class airPodsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getAllCategoriesLink = page.getByLabel("Open All Categories Menu");
    this.getAllElectronicItemsLink = page.getByRole("link", {
      name: "Electronics",
    });
    this.getAllHeadphonesLink = page.locator(
      "//a[contains(text(),'Headphones')][1]"
    );
    this.mainSearchBox = page.getByPlaceholder("Search Amazon");
    this.mainSearchBoxSubmitButton = page.locator(
      "//input[@id='nav-search-submit-button']"
    );
    this.filterByNfcCheckbox = page.getByLabel(
      "Apply NFC filter to narrow results"
    );
    this.filterByWiredCheckbox = page.getByLabel(
      "Apply Wired filter to narrow results"
    );
  }
  async filterByProduct(productFilter) {
    await this.getAllCategoriesLink.click();
    await this.getAllElectronicItemsLink.click();
    await this.getAllHeadphonesLink.first().click({ force: true });
    await this.mainSearchBox.click();
    await this.mainSearchBox.fill(productFilter);
    await this.mainSearchBoxSubmitButton.click();
    // Many times NFC option is not available in results list. So test fails due to timeout waiting for an element.
    // for testing I have used wired filter
    //await this.filterByNfcCheckbox.click();
    await this.filterByWiredCheckbox.click();
  }

  async getProductTitles() {
    const productTitles = await this.page.$$eval(
      ".s-card-container > .a-section",
      (all_products) => {
        const titles = [];
        all_products.forEach((product) => {
          const titleEl = product.querySelector(".a-text-normal");
          const title = titleEl
            ? titleEl.innerText
            : "This product has no title";

          if (title != null) {
            titles.push({ title });
          }
        });
        return titles;
      }
    );
    return productTitles;
  }
  isAirPodsWordInTitle(productTitles, desiredProduct) {
    let isAirPodsWordInTitle = true;
    for (let i = 0; i < productTitles.length - 1; i++) {
      if (!productTitles[i].title.includes(desiredProduct)) {
        console.log(
          "Product title without word AirPods is :  " + productTitles[i].title
        );
        isAirPodsWordInTitle = false;
      }
    }
    return isAirPodsWordInTitle;
  }
}
