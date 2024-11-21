import { amazonHomePage } from "./page-objects/amazonHomePage.js";
import { airPodsPage } from "./page-objects/airPodsPage.js";
import { gamingKeyboardsPage } from "./page-objects/gamingKeyboardsPage.js";

describe("Amazon Product Search", () => {
  it("Search Gaming Keyboards on Amazon", () => {
    const home = new amazonHomePage();
    const gamingKeyboards = new gamingKeyboardsPage();
    home.navigateToAmazonHomePage();
    home.ensureHomePageLoadsSuccessfully();
    gamingKeyboards.filterByProduct("Apply Logitech G filter to");
    const productPrices = gamingKeyboards.getProducts();
    const formattedProductPrice =
      gamingKeyboards.formatPriceStringToNumber(productPrices);
    console.log(formattedProductPrice);
    // Assert that the "high to "low" pricing filter is applied to the product
    expect(gamingKeyboards.isDescendingPrice(formattedProductPrice)).to.be.true;
  });

  it("Search AirPods on Amazon", () => {
    const desiredProduct = "AirPods";
    const home = new amazonHomePage();
    const airPods = new airPodsPage();
    home.navigateToAmazonHomePage();
    home.ensureHomePageLoadsSuccessfully();
    airPods.filterByProduct(desiredProduct);
    const titles = airPods.getProductTitles();
    // Assert that all the "airpods" listed on page contain the word "airpods" in their title.
    // If not report such products by printing their name on console.
    expect(airPods.isAirPodsWordInTitle(titles, desiredProduct)).to.be.true;
  });
});
