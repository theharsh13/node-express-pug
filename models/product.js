const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");
const Cart = require('./cart')

const p = path.join(rootDir, "data", "product.json");

const getProductsFromFile = (callback) => {
  /* in order to get data callback function is required,
        whenever file reading is done this callback will get called. */
  fs.readFile(p, (err, fileContent) => {
    err ? callback([]) : callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageurl, description, price) {
    this.id = id;
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static deleteProduct(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id == id);
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if(!err){
            Cart.deleteProduct(id,product.price)
        }
      });
    });
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
