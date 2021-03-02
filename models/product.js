const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'product.json')

const getProductsFromFile = (callback)=>{
    /* in order to get data callback function is required,
        whenever file reading is done this callback will get called. */
    fs.readFile(p, (err,fileContent)=>{
        err ? callback([]) : callback(JSON.parse(fileContent))
    })
}

module.exports = class Product {
    constructor(title, imageurl, description, price){
        this.title = title
        this.imageurl = imageurl
        this.description = description
        this.price = price
    }

    save() {

        getProductsFromFile((products)=>{
            products.push(this)
            fs.writeFile(p, JSON.stringify(products),  (err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(callback){
        getProductsFromFile(callback)
    }
}