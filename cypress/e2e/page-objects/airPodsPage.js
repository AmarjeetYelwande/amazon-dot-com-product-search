/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import "cypress-get-by-label/commands";

export class airPodsPage {
  filterByProduct(productFilter) {
    cy.xpath("//i[@class='hm-icon nav-sprite']").click();
    cy.xpath("//a[@class='hmenu-item']//div[contains(text(),'Electronics')]")
      .first()
      .click();
    cy.xpath("//a[contains(text(),'Headphones')]").first().click();
    cy.xpath("//input[@role='searchbox']").click();
    cy.xpath("//input[@role='searchbox']").type(productFilter);
    cy.xpath("//input[@id='nav-search-submit-button']").click();
    // cy.xpath(
    //   "//a[@aria-label='Apply NFC filter to narrow results']//i[@class='a-icon a-icon-checkbox']"
    // ).click();
    // Many times NFC option is not available in results list. So test fails due to timeout waiting for an element.
    // for testing I have used wired filter

    cy.xpath(
      "//a[@aria-label='Apply Wired filter to narrow results']//i[@class='a-icon a-icon-checkbox']"
    ).click();
  }

  getProductTitles() {
    const productTitles = cy.xpath(
      //".s-card-container > .a-section",
      './/*[contains(concat(" ",normalize-space(@class)," ")," s-card-container ")]/*[contains(concat(" ",normalize-space(@class)," ")," a-section ")]',
      (all_products) => {
        const titles = [];
        Array.from(all_products).forEach((product) => {
          const titleEl = product.get(".a-text-normal");
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
      if (!productTitles[i].title.toLowerCase().includes(desiredProduct)) {
        cy.task(
          "log",
          "Product title without word AirPods is :  " + productTitles[i].title
        );
        isAirPodsWordInTitle = false;
      }
    }
    return isAirPodsWordInTitle;
  }
}
