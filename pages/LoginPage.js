
class LoginPage{

    // Constructor to receive and store the page object
    constructor(page)
    {
        // Initializing page object and locators in constructor itself for re-usability and to avoid repetition
        
        this.page=page;

        this.username = page.locator("#user-name");
        this.password = page.locator("#password");
        this.login = page.locator("#login-button");
        
        this.productSort = page.locator('[data-test="product-sort-container"]');

    }

    // Method to navigate to saucedemo page. Declared 'async' to allow it to use 'await' inside
    async navigateToLoginPage()
    {
        await this.page.goto(process.env.BASE_URL);
    }

    // Method to perfrom login. Accepts username, password when called and performs 'click' function.
    async performLogin(my_username, my_password)
    {
       await this.username.fill(my_username);
       await this.password.fill(my_password);
       await this.login.click(); 
    }

    // Method to verify if product sort functionality is visible or not, return true or false.
    //Fallback implemented
    
    async loginSuccess() {
        try {
            await this.productSort.waitFor({ state: 'visible', timeout: 3000 });
            return await this.productSort.isVisible();
        } catch (error) {
            // Fallback: checking for other product title visibility
            const fallbackLocator = this.page.locator('.inventory_item_name');
            try {
                await fallbackLocator.first().waitFor({ state: 'visible', timeout: 3000 });
                return await fallbackLocator.first().isVisible();
            } catch (fallbackError) {
                console.error('Both primary and fallback locators failed:', fallbackError);
                return false;
            }
        }
    }
    

   
}

module.exports = { LoginPage };
