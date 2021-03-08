const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    docTitle: "Login",
    path: "/login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              if (err) console.log("error in postLogin : ", err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          if (err) console.log(err);
          return res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSignup = (req, res, next) => {
  console.log(req.session);
  res.render("auth/signup", {
    docTitle: "Signup",
    path: "/signup",
    isAuthenticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedpassword) => {
          const newUser = new User({
            email: email,
            password: hashedpassword,
            username: email,
            cart: { items: [] },
          });
          return newUser.save();
        })
        .then((user) => {
          console.log("User Created! with email : ", user.email);
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
