const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice,callback) {
    //fetch previous cart
    fs.readFile(p, (err, fileContents) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContents);
      }
      //analyze cart -> find existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //add new product or increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
      callback()
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContents) => {
      if (!err) {
        const cart = JSON.parse(fileContents);
        const product = cart.products.find((p) => p.id === id);
        const updatedCart = { ...cart };
        if(!product){
          return
        }
        updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
        updatedCart.totalPrice =
          updatedCart.totalPrice - productPrice * product.qty;
        fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
          console.log(err);
        });
      }
    });
  }

  static getProducts(callback) {
    fs.readFile(p, (err, fileContents) => {
      if (err) {
        callback(null);
      } else {
        const cart = JSON.parse(fileContents);
        callback(cart);
      }
    });
  }
};
