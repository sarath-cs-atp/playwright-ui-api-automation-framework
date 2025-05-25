
//Load env variables
require('dotenv').config();

//Import test, expect and page objects
const {test, expect} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');

//Test case for adding selected two items to card and validating cart
test('Add top two products to cart and validate cart page', async ({ page }) => {
    
    //1. Login and navigate to the inventory page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.performLogin(process.env.My_USERNAME, process.env.My_PASSWORD);
    const success = await loginPage.loginSuccess();
    expect(success).toBeTruthy();

    //Sort, select and add top two items to cart in Inventory page
    const inventoryPage= new InventoryPage(page);
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

    expect(cartItems).toContain(topTwoProducts[0].productName, `Expected cart to contain ${topTwoProducts[0].productName}`);
    expect(cartItems).toContain(topTwoProducts[1].productName, `Expected cart to contain ${topTwoProducts[1].productName}`);


});