const database = require('./database.js');
const { Product, Feature, Style, Sku, Photo } = require('./allProducts.js');
// this is where we will require our models
// this is also where our associations will live


module.exports = {
  database,
  Product
}
