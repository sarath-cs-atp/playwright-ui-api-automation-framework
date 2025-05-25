
// Import the calculateTotal function from the utility module
const { calculateTotal } = require('./calculateTotal');

describe('calculateTotal', () => {
    // Test case 1: When an empty product list is passed, total should be 0
    it('should return 0 for empty array', () => {
      expect(calculateTotal([])).toBe(0);
    });

    // Test case 2: Validate the correct total is returned for a typical list of products
    it('should return correct total for product list', () => {
        const products = [
          { name: 'Item A', price: 10 },
          { name: 'Item B', price: 15 },
          { name: 'Item C', price: 5 },
        ];
        expect(calculateTotal(products)).toBe(30);
    });

      // Test case 3: Verify total calculation, when products have decimal values
    it('should handle prices with decimals', () => {
      const products = [
        { name: 'Item A', price: 12.5 },
        { name: 'Item B', price: 7.25 },
      ];
       expect(calculateTotal(products)).toBeCloseTo(19.75);
    });
});
  