const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title)
  product.save()
  res.redirect("/");
};

exports.getProducts = (req,res,next)=>{
    //tells express to render output from shop.pug file
    res.render('shop', {
        docTitle: 'Shop view',
        path : '/',
        prods : Product.fetchAll()
    })
}