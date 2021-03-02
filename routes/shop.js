const path = require('path')

const express = require('express')

// const rootDir = require('../util/path') //NOT IN USE - because of templeting engine
const shopController = require('../controllers/shop')

const router = express.Router()

router.get('/', shopController.getIndex)
router.get('/products/:productId', shopController.getProduct)
router.get('/products', shopController.getProducts)
router.get('/cart', shopController.getCart)
router.post('/cart', shopController.postCart)
router.post('/cart-delete-item', shopController.postDeleteCartItem)
router.get('/orders', shopController.getOrders)
router.get('/checkout', shopController.getCheckout)




module.exports = router