
const { expect } = require('@playwright/test');

class InventoryPage{

    constructor(page)
    {
        // Initialize page object and locators
        this.page = page;
        this.productSortDropdown = page.locator('[data-test="product-sort-container"]');
        this.productNames = page.locator('.inventory_item_name');
        this.productPrices = page.locator('.inventory_item_price');

    }

    //Method to sort products by price from high to low
    async sortProductsByPriceHighToLow()
    {        
        await this.productSortDropdown.selectOption('hilo');
    }

    //Method to select top 2 items and get their names and prices
    async selectTopTwoProducts()
    {
        const names = await this.productNames.allInnerTexts();
        const pricesText= await this.productPrices.allInnerTexts();
        const prices=pricesText.map(text => parseFloat(text.replace('$', ''))); 

        return  [{productName: names[0], productCost: prices[0]}, {productName: names[1], productCost: prices[1]}];
    }

    //Method to add selected top two items to cart
    async addSelectedTopTwoItemsToCart(cartProducts)
    {
        for(const product of cartProducts)
        {
            console.log(`Attempting to add: ${product.productName}`);

            const productLocator = this.page.locator('.inventory_item').filter(
                {has: this.page.locator(`text=${product.productName}`)})     

        // Screenshot before clicking
        await this.page.screenshot({ path: `before-click-${product.productName}.png` });

        const addButton = productLocator.locator('button:has-text("Add to cart")');
        await expect(addButton).toBeVisible({ timeout: 5000 });
        await addButton.click();
       
        const removeButton = productLocator.locator('button:has-text("Remove")');
        await expect(removeButton).toBeVisible({ timeout: 3000 });

        }                
    }
}

module.exports = { InventoryPage };