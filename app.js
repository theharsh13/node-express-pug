const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

//create  helper function to get the root directory path
const rootDir = require("./util/path");
const mongoose = require("mongoose");
const User = require("./models/user");

const MONGO_URI = "mongodb://localhost:27017/shop";

const app = express();
const store = new MongoDBStore({ uri: MONGO_URI, collection: "sessions" });

// tell express to use 'pug' as view engine
app.set("view engine", "pug");
// tell express to look for templetes in views dir // by default express checks for templetes in view dir only
app.set("views", "views");

//seperate out routes, provide modular code
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const errorController = require("./controllers/error");

// middleware to notify express parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// notify express to not to handle public folder, generally all static files goes into these folders
app.use(express.static(path.join(rootDir, "public")));

app.use(
  session({ secret: "my secret", resave: false, saveUninitialized: false, store: store })
);

app.use((req,res,next)=>{
  if(!req.session.user){
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err);
    });
})

app.use("/admin", adminRoutes.routes);
app.use(shopRoutes);
app.use(authRoutes);

// to handle 404 page
app.use(errorController.get404);

mongoose
  .connect(MONGO_URI)
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
