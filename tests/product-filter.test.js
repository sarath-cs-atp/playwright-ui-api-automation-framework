
//Load environment variables
require('dotenv').config();

//Import Playwright's test runner and assertion library; test and expect functions
const { test, expect } = require('@playwright/test');

//Import LoginPage and InventoryPage
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');

//Test case to filter products, sort and select top 2 items
test('Filter products, sort and select top 2 items', async ({page}) => {

    //1. Login and navigate to the inventory page
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.performLogin(process.env.My_USERNAME, process.env.My_PASSWORD);
    const success = await loginPage.loginSuccess();
    expect(success).toBeTruthy();

    //2. Filter products and select top 2 items
    const inventoryPage= new InventoryPage(page);
    await inventoryPage.sortProductsByPriceHighToLow();

    const topTwoProducts= await inventoryPage.selectTopTwoProducts();
    console.log("Top two products - names and prices");

    topTwoProducts.forEach( 
        function(inventoryProduct, index)
        {
            const productDetail= (index+1)+'.'+inventoryProduct.productName+' - $'+inventoryProduct.productCost;
            console.log(productDetail);
        }                                 
    );

    //Validations to verify captured values
    expect(topTwoProducts.length).toBe(2);
    expect(topTwoProducts[0].productName).not.toBe('');
    expect(topTwoProducts[0].productCost).toBeGreaterThan(0);

});