/// <reference types="cypress" />

// Read the expected response from the locally stored file
import expectedPropertiesOfUser1 from "./userData/propertiesOfUser1.json";

it("Properties for a given user should match with response body", () => {
  cy.request("GET", "https://jsonplaceholder.typicode.com/posts?userId=1").then(
    (response) => {
      // response.body is automatically serialized into JSON
      expect(response.status).to.eq(200);
      // Log the response body for debugging purposes
      cy.task("log", response.body);
      // Compare the expected properties with the actual response body
      expect(response.body).to.deep.equal(expectedPropertiesOfUser1);
    }
  );
});
