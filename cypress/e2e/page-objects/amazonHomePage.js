/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

import "cypress-get-by-label/commands";

export class amazonHomePage {
  constructor() {
    this.url = "https://www.amazon.com";
  }

  elements = {
    mainSearchBox: () => cy.xpath("//input[@aria-label='Search Amazon']"),
    warningButton: () => cy.xpath("//input[@data-action-type='DISMISS']"),
    // Required in case you get captcha after visiting amazon.com webpage.
    captchaURL: () =>
      cy.xpath(
        '//a[contains(@href,"https://www.amazon.com/gp/help/customer/display.html/ref=footer_cou?ie=UTF8&nodeId=508088")]'
      ),
  };

  navigateToAmazonHomePage() {
    cy.visit(this.url);
  }

  ensureHomePageLoadsSuccessfully() {
    // Sometimes Amazon home page loads weird with no elements. Refresh solves that problem.
    !this.elements.mainSearchBox.isVisible && cy.reload(true);

    // This code is useful if you get captcha after visiting amazon.com homepage
    // captchaURL.should("be.visible") && captchaURL.click();

    // On home page user is warned that the only products delivered to Uk are shown. Simply ignore this warning.
    this.elements.warningButton.isVisible &&
      this.elements.warningButton.click();
  }
}
