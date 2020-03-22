// ===========================
// Comments Routes
// ===========================
var express = require("express");
var router = express.Router({ mergeParams: true });
var Comment = require("../models/comments.model");
var campground = require("../models/campground.model");

//Route to create comment
router.get("/new", isLoggedIn, (req, res) => {
  // Find the campground by id
  campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log("Error in creating comment");
    } else {
      console.log("Campground found!");
      //render the form
      res.render("comments/new", { campground: foundCampground });
    }
  });
});

router.post("/", isLoggedIn, (req, res) => {
  campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log("Error in creating comment");
      res.redirect("/campgrounds");
    } else {
      var author = req.body.author;
      var text = req.body.text;
      var cmnt = { author: author, text: text };
      console.log(cmnt);
      Comment.create(cmnt, (err, newComment) => {
        if (err) {
          console.log(err);
        } else {
          //console.log("Comment created");
          //console.log(newComment);
          // add username and id
          newComment.author.id = req.user._id;
          newComment.author.username = req.user.username;
          // save the comment
          newComment.save();
          foundCampground.comments.push(newComment);
          foundCampground.save();
          res.redirect("/campgrounds/" + foundCampground._id);
        }
      });
    }
  });
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