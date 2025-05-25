
//Load environment variables from .env file
require('dotenv').config();

//Import Playwright's test runner and assertion library; test and expect functions
const { test, expect }  = require('@playwright/test');

//Import LoginPage class
const { LoginPage } = require('../pages/LoginPage');

//Test Case for login functionality
test('Login test - using valid credentials', async ({page}) =>{
   
    const loginPage = new LoginPage(page);    
    await loginPage.navigateToLoginPage();
    console.log('Username from .env:', process.env.My_USERNAME);
    await loginPage.performLogin(process.env.My_USERNAME, process.env.My_PASSWORD);
    
    const success = await loginPage.loginSuccess();
    expect(success).toBeTruthy();

});

