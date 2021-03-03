const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  //tells express to render output from shop.pug file
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        docTitle: "All Products",
        path: "/products",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //tells express to render output from shop.pug file
  Product.findById(prodId)
    .then((product) => {
      res.render("shop/product-detail", {
        docTitle: product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  //tells express to render output from shop.pug file
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        docTitle: "All Products",
        path: "/",
        prods: products,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  let user = req.user;
  user
    .getCart()
    .then((items) => {
      console.log(items);
      res.render("shop/cart", {
        docTitle: user.username + "'s Cart",
        path: "/cart",
        products: items,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("Product added To Cart!");
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  req.user
    .deleteItemFromCart(id)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then((orders) => {
      console.log(orders);
      res.render("shop/orders", {
        docTitle: "Orders",
        path: "/orders",
        orders: orders,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      res.redirect('/orders')
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
