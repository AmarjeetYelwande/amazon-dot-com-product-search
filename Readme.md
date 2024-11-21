# Amazon Product Search End to End tests

## Purpose of tests in this project is to search amazon.com for below products

- In "PC gaming Department" list all Gaming keyboards
- In "Headphones & Earbuds" department list all airpods

## Tests have been written in Cypress and Playwright using Page Object Model

- You can find the code in respective folders Cypress and Playwright
- For commands refer package.json file
- Batch files with same name as commands in "Scripts" folder have following commands from package.json

```javascript
    "cyopen": "cypress open",
    "cytestheadless": "cypress run",
    "cytestheaded": "cypress run --headed",
    "pwui": "npx playwright test --ui",    
    "pwtestheadless": "npx playwright test --project=chromium --workers=1 && npx playwright show-report",
    "pwtestheaded": "npx playwright test --headed --project=chromium --workers=1 && npx playwright show-report",
    "pwtest20": "npx playwright test --headed --project=chromium --workers=1 --repeat-each=10 && npx playwright show-report",
    "pwcodegen": "npx playwright codegen"
```

## Setting up project and run Tests

- Clone the project "https://github.com/cluepoints-recruitment/POC-AutoTest-Amarjeet3.git"
- Run command "npm install" to install package dependencies
- Run following batch file from root of the folder.
- cytest runs all the playwright tests and generate report in folder "cypress-report"
- pwtest runs all the cypress tests and generate report in folder "playwright-report"
