
//Import backend data (JSON)file to compare with cart UI data
import { loadProductData } from '../utils/dataLoader'; 

//Load environment variables
require('dotenv').config();

////Import test, expect and page objects
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test('Complete checkout and verify total', async ({ page }) => {
    
    //1. Login and navigate to the inventory page
     const loginPage = new LoginPage(page);
     await loginPage.navigateToLoginPage();
     await loginPage.performLogin(process.env.My_USERNAME, process.env.My_PASSWORD);
     const success = await loginPage.loginSuccess();
     expect(success).toBeTruthy();

    //Sort, select and add top two items to cart in Inventory page
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.sortProductsByPriceHighToLow();
    const topTwoProducts = await inventoryPage.selectTopTwoProducts();
    await inventoryPage.addSelectedTopTwoItemsToCart(topTwoProducts);

    console.log("Clicked Add to Cart on top two products");

    //Navigate to cart and validate
    const cartPage = new CartPage(page);
    
    await page.waitForLoadState('networkidle')
    await cartPage.goToCart();
    await page.waitForLoadState('networkidle');
    const cartItems = await cartPage.getCartItemNames();

    console.log('Expected:', topTwoProducts.map(p => p.productName));
    console.log('Actual:', cartItems);

    expect(cartItems).toContain(topTwoProducts[0].productName, 'Expected cart to contain ' + topTwoProducts[0].productName);
    expect(cartItems).toContain(topTwoProducts[1].productName, 'Expected cart to contain ' + topTwoProducts[1].productName);

    // Loading backend data (JSON) file and comparing that data with cart UI data
    const backendData = await loadProductData();

    for (const product of topTwoProducts) {
        let match = null;
      
        for (let i = 0; i < backendData.length; i++) {
          if (backendData[i].productName === product.productName) {
            match = backendData[i];
            break;
          }
        }
      
        //Comparing product from UI vs Backend data file        
        console.log("UI Product:", product);
        console.log("Backend Product:", match);

        // Assertions to ensure data consistency
        expect(match).toBeTruthy(); 
        expect(product.productCost).toBeCloseTo(match.productCost, 2);
      }

    // Start checkout, enter customer info, verify total amount, complete order, and confirm thank you message is displayed.
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.startCheckout();
    await checkoutPage.fillCustomerInfo('Test_S', 'User_C', 'A1B 2C3');
    
    const subtotal = topTwoProducts[0].productCost + topTwoProducts[1].productCost;
    const expectedTotal = await checkoutPage.getExpectedTotalAmountWithTax(subtotal);
    const actualTotal = await checkoutPage.getTotalAmount();

    console.log("Expected Total: $" + expectedTotal + ", Displayed Total: $" + actualTotal);
    expect(actualTotal).toBeCloseTo(expectedTotal, 2);

    await checkoutPage.completeOrder();
    expect(await checkoutPage.isThankYouDisplayed()).toBeTruthy();

});