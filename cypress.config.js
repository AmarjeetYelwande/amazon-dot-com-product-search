import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
    watchForFileChanges: true,
    defaultCommandTimeout: 60000,
    specPattern: "**/*.cy.{js,jsx,ts,tsx}",
    experimentalStudio: true,
    reporter: "mochawesome",
    reporterOptions: {
      configFile: "reporter-config.json",
      reportDir: "cypress-report/results",
      overwrite: false,
      html: true,
      json: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
  },
});
