const express = require("express");

//const rootDir = require("../util/path"); // NOT IN USE - because of templeting engine
const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/add-product", isAuth, adminController.getAddProduct);
router.get("/products", adminController.getProducts);
router.post("/add-product", isAuth, adminController.postAddProduct);
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);
router.post("/edit-product", isAuth, adminController.postEditProduct);
router.post("/delete-product", isAuth, adminController.postDeleteProduct);

exports.routes = router;
