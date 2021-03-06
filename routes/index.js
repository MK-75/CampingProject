var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user.model");

router.get("/", (req, res) => {
  res.render("landing");
});

//===========================
// Authentication - Routes
//===========================

// User Registeration Route
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    });
  });
});

// Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (err, user) => {
  });

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
});

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    res.redirect("/login");
  }
}

module.exports = router;