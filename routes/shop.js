const path = require('path')

const express = require('express')

// const rootDir = require('../util/path') //NOT IN USE - because of templeting engine
const productsController = require('../controllers/products')

const router = express.Router()

router.get('/', productsController.getProducts)

module.exports = router