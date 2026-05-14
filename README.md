# End-to-End Test Automation Framework using Playwright (JavaScript)

This is an end-to-end (E2E) test automation framework built using Playwright with JavaScript.  
It is designed to validate UI workflows and data integrity using a scalable and maintainable architecture.

The framework follows the Page Object Model (POM) design pattern and supports UI automation, data validation, and unit testing.

## Framework Capabilities

- End-to-end UI automation testing
- Data validation between UI and external dataset
- Page Object Model (POM) architecture
- Reusable utilities and test helpers
- Unit testing for core utility functions
- HTML reporting with Allure

## Automated Scenarios

- User authentication flow
- Product filtering and sorting validation
- Add to cart workflow validation
- Checkout process verification
- Cart and pricing validation

## Project Structure

    allure-report/
    allure-results/
    data/
        productData.json
    node_modules/
    pages/
        CartPage.js
        CheckoutPage.js
        InventoryPage.js
        LoginPage.js
    screenshots/
    test-results/
    tests/
        add-to-cart.test.js
        checkout.test.js
        login.test.js
        product-filter.test.js
    unit-tests/
        calculateTotal.js
        calculateTotal.test.js
    utils/
        dataLoader.js
    .env
    jest.config.js
    package.json
    package-lock.json
    playwright.config.js
    README.md

## Features Implemented

### Automated Test Scenarios
- User authentication workflow validation
- Product filtering and sorting verification
- Add to cart and cart validation
- Checkout process validation
- Order total and data consistency checks

### Data Validation Strategy
- Test data is managed using structured JSON files
- UI values are validated against external test datasets
- Ensures consistency between UI rendering and expected data

### CLI and Configuration
- Support for headless/headful modes via playwright.config.js
- Base URL and timeout configurations managed via .env

### Bonus Tasks
- Jest unit test for a utility (calculateTotal)
- Allure reporting integrated

## Installation

    git clone https://github.com/sarath-cs-atp/automation-challenge-playwright-cs.git
    cd automation-challenge-playwright-cs
    npm install

## Execution Guide

### Run All Playwright Tests

    npx playwright test

### Run in Headful Mode

    npx playwright test --headed

### Run Specific Test File

    npx playwright test tests/login.test.js

## Reporting

The framework integrates Allure reporting for detailed test execution reports including:
- Test execution status
- Step-level logs
- Failure analysis

## Allure Reports
    npx allure generate allure-results --clean -o allure-report
    npx allure open allure-report

## Unit Testing with Jest

    npm run test:unit

## Notes

- Project follows the Page Object Model for modularity and readability.
- Playwright test files are separated from Jest unit tests.
- calculateTotal.js is a sample utility added to demonstrate Jest unit testing.
- Configurations and environment variables can be managed through .env and playwright.config.js
  
## Design Principles

- Modular architecture using Page Object Model (POM)
- Separation of test logic and page interactions
- Reusable utility functions
- Scalable folder structure for future expansion
