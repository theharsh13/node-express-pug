const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

module.exports = class Product {
    constructor(t){
        this.title = t
    }

    save() {
        const p = path.join(rootDir, 'data', 'product.json')
        fs.readFile(p, (err,fileContent)=>{
            let products = []
            if (!err) {
                products = JSON.parse(fileContent)
            }
            products.push(this)
            fs.writeFile(p, JSON.stringify(products),  (err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(callback){
        /* in order to get data callback function is required,
         whenever file reading is done this callback will get called. */
        const p = path.join(rootDir, 'data', 'product.json')
        fs.readFile(p, (err,fileContent)=>{
            if(err){
                callback([])
            }
            callback(JSON.parse(fileContent))
        })
    }
}