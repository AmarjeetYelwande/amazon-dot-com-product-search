import { test, expect } from "@playwright/test";
import { amazonHomePage } from "./page-objects/amazonHomePage.js";
import { gamingKeyboardsPage } from "./page-objects/gamingKeyboardsPage.js";
import { airPodsPage } from "./page-objects/airPodsPage.js";

test("Search Gaming Keyboards on Amazon", async ({ page }) => {
  const home = new amazonHomePage(page);
  const gamingKeyboards = new gamingKeyboardsPage(page);
  await home.navigateToAmazonHomePage();
  await home.ensureHomePageLoadsSuccessfully();
  await gamingKeyboards.filterByProduct("Apply Logitech G filter to");
  const productPrices = await gamingKeyboards.getProducts();
  const formattedProductPrice =
    await gamingKeyboards.formatPriceStringToNumber(productPrices);
  console.log(formattedProductPrice);
  // Assert that the "high to "low" pricing filter is applied to the product
  expect(gamingKeyboards.isDescendingPrice(formattedProductPrice)).toBeTruthy();
});

test("Search AirPods on Amazon", async ({ page }) => {
  const desiredProduct = "AirPods";
  const home = new amazonHomePage(page);
  const airPods = new airPodsPage(page);
  await home.navigateToAmazonHomePage();
  await home.ensureHomePageLoadsSuccessfully();
  await airPods.filterByProduct(desiredProduct);
  const titles = await airPods.getProductTitles();
  // Assert that all the airpods contain the word "airpods" in their title. If not report such products.
  expect(airPods.isAirPodsWordInTitle(titles, desiredProduct)).toBeTruthy();
});
