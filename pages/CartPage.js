
class CartPage{

    constructor(page)
    {
        // Initialize page object and locators
        this.page = page;
        this.cartItems = page.locator('.cart_item');               
    }

    //Method to navigate to the cart page
    async goToCart()
    {        
        await this.page.screenshot({ path: 'screenshots/before-click-cart.png' });

        await this.page.click('.shopping_cart_link');
        await this.page.waitForURL('**/cart.html');

        await this.page.screenshot({ path: 'screenshots/after-click-cart.png' });
    }

    //Method to return a list of product names in the cart
    async getCartItemNames()
    {
        const cartItemNameElements = this.page.locator('.cart_item .inventory_item_name');
        return await cartItemNameElements.allTextContents();        
    }

}

module.exports = { CartPage };