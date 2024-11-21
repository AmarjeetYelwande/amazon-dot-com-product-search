/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import "cypress-get-by-label/commands";

export class gamingKeyboardsPage {
  filterByProduct(productFilter) {
    //cy.xpath("//i[@class='hm-icon nav-sprite']").click();
    cy.get(".hm-icon").click();
    cy.xpath("(//i[@class='nav-sprite hmenu-arrow-more'])[1]").click({
      force: true,
    });

    //cy.findByRole("link", { name: "Video Games" }).click({ force: true });
    cy.wait(1000);

    cy.xpath("(//a[@class='hmenu-item'][contains(.,'Video Games')])[1]").click({
      force: true,
    });
    cy.xpath("//a[contains(text(),'PC')]").first().click({ force: true });

    cy.xpath(
      "//span[@class='a-size-base a-color-base'][contains(.,'PC Accessories')]"
    )
      .first()
      .click({ force: true });

    cy.xpath(
      "//span[@class='a-size-base a-color-base'][contains(.,'PC Gaming Keyboards')]"
    )
      .first()
      .click({ force: true });
    cy.xpath(
      "//a[@aria-label='Apply Logitech G filter to narrow results']//i[@class='a-icon a-icon-checkbox']"
    ).click();
    cy.xpath("//span[@id='a-autoid-0-announce']").click();
    cy.xpath("//a[@id='s-result-sort-select_2']").trigger("mouseover").click();
    //cy.xpath("//a[@id='s-result-sort-select_2']").click();
    cy.wait(1000);
  }

  getProducts() {
    const allPrices = cy.xpath(
      //".s-card-container > .a-section",
      './/*[contains(concat(" ",normalize-space(@class)," ")," s-card-container ")]/*[contains(concat(" ",normalize-space(@class)," ")," a-section ")]',
      (all_products) => {
        const prices = [];
        Array.from(all_products).forEach((product) => {
          const priceEl = product.xpath(".a-offscreen");
          const priceE2 = product.xpath(".a-color-base");
          const priceInUSDollars = priceEl
            ? priceEl.innerText
            : priceE2.innerText;

          if (priceInUSDollars.substring(0, 1) == "$") {
            cy.task("log", priceInUSDollars);
            prices.push({ priceInUSDollars });
          }
        });

        return prices;
      }
    );
    console.log(allPrices);
    debugger;
    return allPrices;
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
