
function calculateTotal(products) {
    let sum = 0;
    for (let product of products) 
        {
             sum += product.price;
        }
    return sum;
  }
  
  module.exports = { calculateTotal };
  