const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req,res,next)=>{
    //tells express to render output from shop.pug file
    res.render('shop', {
        docTitle: 'Shop view',
        path : '/',
        prods : products
    })
}