const path = require('path')

const express = require('express')

const rootDir = require('../util/path')
const adminData = require('./admin')


const router = express.Router()

router.get('/',(req,res,next)=>{
    //tells express to render output from shop.pug file
    const products= adminData.products
    res.render('shop', {
        docTitle: 'Shop view',
        prods : products
    })
})

module.exports = router