const Product = require('../models/product')


exports.getProducts = (req, res, next) => {
  //tells express to render output from shop.pug file
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      docTitle: "All Products",
      path: "/products",
      prods: products,
    });
  });
};

exports.getIndex = (req, res, next) => {
  //tells express to render output from shop.pug file
  Product.fetchAll((products) => {
    res.render("shop/index", {
      docTitle: "Welcome",
      path: "/",
      prods: products,
    });
  });
};

exports.getCart = (req,res,next) =>{
    res.render('shop/cart', 
    {
        docTitle: "Your Cart",
        path: '/cart'
    })
}

exports.getOrders = (req,res,next) =>{
  res.render('shop/orders', 
  {
      docTitle: "Your Orders",
      path: '/orders'
  })
}

exports.getCheckout = (req,res,next) =>{
    res.render('shop/checkout', 
    {
        docTitle: "Checkout",
        path: '/checkout'
    })
}