const path = require("path");
const express = require("express");

//const rootDir = require("../util/path"); // NOT IN USE - because of templeting engine
const productsController = require('../controllers/products')

const router = express.Router();

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

exports.routes = router;