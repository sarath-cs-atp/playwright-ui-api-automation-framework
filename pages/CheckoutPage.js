
const { expect } = require('@playwright/test');

class CheckoutPage{

    constructor(page)
    {
        // Initialize page object and locators
        this.page = page;
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.totalLabel = page.locator('.summary_total_label');
        this.thankYouHeader = page.locator('.complete-header');
    }

    //Method for Checkout - Your Cart page
    async startCheckout() {
        await this.checkoutButton.click();
        await this.page.waitForURL('**/checkout-step-one.html');
    }

    //Method to input customer information in Checkout: Your Information, page
    async fillCustomerInfo(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(postalCode);
        await this.continueButton.click();
        await this.page.waitForURL('**/checkout-step-two.html');
    }

    // Method to extract and return the numeric total amount from the text content of totalLabel, or null if not found.
    async getTotalAmount() {
        const totalText = await this.totalLabel.textContent(); 
        const match = totalText.match(/\$([\d.]+)/);  
        
        console.log(match); 
        console.log(match[0]);
        console.log(match[1]); 
        
        return match ? parseFloat(match[1]) : null; 
    }
    
    async getExpectedTotalAmountWithTax(productTotal) {

        const taxText = await this.page.locator('.summary_tax_label').textContent();
        const taxMatch = taxText.match(/\$([\d.]+)/);
        const tax = taxMatch ? parseFloat(taxMatch[1]) : 0;
        return productTotal + tax;
    }

    // Method to click the Finish button and wait for navigation to the Checkout: Complete! page.
    async completeOrder() {
        await this.finishButton.click();
        await this.page.waitForURL('**/checkout-complete.html');
    }

    // Method to check if the "Thank you for your order!" confirmation message is visible after completing the order.
    async isThankYouDisplayed() {
        return await this.thankYouHeader.isVisible();
    }
}

module.exports = { CheckoutPage };