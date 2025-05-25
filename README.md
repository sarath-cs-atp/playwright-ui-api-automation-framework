# Playwright Automation Challenge – SauceDemo E2E Testing

This project is developed as part of the Automation Technical Challenge and showcases an end-to-end (E2E) automation suite using Playwright with JavaScript. The target demo website is https://www.saucedemo.com/.

It covers:
- UI testing
- API/data validation
- Page Object Model (POM) architecture

All mandatory and 2 bonus tasks have been completed:
- Login
- Product Filtering
- Add to Cart
- Checkout
- API/Data Validation
- Allure test reports
- Jest unit testing

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

### Core Tasks
- Login using valid credentials
- Filter and sort products by price (High to Low)
- Select top 2 products and add to cart
- Validate cart contains selected items
- Proceed to checkout with test data
- Validate checkout total against simulated backend data

### API/Data Validation
- Simulated backend data via productData.json
- Compared UI cart total with backend prices

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

## How to Run

### Run All Playwright Tests

    npx playwright test

### Run in Headful Mode

    npx playwright test --headed

### Run Specific Test File

    npx playwright test tests/login.test.js

## Allure Report

    npx allure generate allure-results --clean -o allure-report
    npx allure open allure-report

## Unit Testing with Jest

    npm run test:unit

## Notes

- Project follows the Page Object Model for modularity and readability.
- Playwright test files are separated from Jest unit tests.
- calculateTotal.js is a sample utility added to demonstrate Jest unit testing.
- Configurations and environment variables can be managed through .env and playwright.config.js
