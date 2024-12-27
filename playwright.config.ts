import { defineConfig, devices } from 'playwright/test';

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: './Playwright/',
  

  // Run all tests in parallel.
  fullyParallel: true,

  outputDir: 'playwright-test-results',
  timeout: 60 * 1000,


  // Reporter to use 
  reporter: [['html', { outputFolder: 'playwright-report' }]],

  use: {

    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'on',
    headless: true,
    launchOptions: {
      args: ["--start-fullscreen"],
      slowMo: 500,
    }

  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },

    },
  ],

});