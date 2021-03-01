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
    constructor(t){
        this.title = t
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