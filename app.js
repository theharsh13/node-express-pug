const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

//create  helper function to get the root directory path
const rootDir = require("./util/path");
const mongoose = require("mongoose");
const User = require("./models/user");

const app = express();
// tell express to use 'pug' as view engine
app.set("view engine", "pug");
// tell express to look for templetes in views dir // by default express checks for templetes in view dir only
app.set("views", "views");

//seperate out routes, provide modular code
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

// middleware to notify express parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// notify express to not to handle public folder, generally all static files goes into these folders
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
  User.findById("60407f5eead33449ecb962c2")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);

// to handle 404 page
app.use(errorController.get404);

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then((result) => {
    console.log("=============== MongoDB Connected! =============="); 
    console.log("========== Starting server at port 3000 =========");

    User.findOne({ _id: "60407f5eead33449ecb962c2" }).then((user) => {
      if (!user) {
        const user = new User({
          username: "Harsh",
          email: "harsh_patel@persistent.com",
          cart: {
            items: [],
          },
        }).save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
