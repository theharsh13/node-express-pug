const Product = require("../models/product");
const Cart = require("../models/cart");

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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //tells express to render output from shop.pug file
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      docTitle: product.title,
      path: "/products",
      product: product,
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

exports.getCart = (req, res, next) => {
  Cart.getProducts((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      let totalPrice = 0.00;

      if(cart){
        totalPrice = cart.totalPrice
        for (product of products) {
          const cartProductData = cart.products.find((p) => p.id === product.id);
          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
      }

      res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
        totalPrice: totalPrice,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
  res.redirect("/cart");

  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price, () => {
      res.render("shop/product-detail", {
        docTitle: "Cart",
        path: "/cart",
      });
    });
  });
};

exports.postDeleteCartItem = (req, res, next) => {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    docTitle: "Your Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
