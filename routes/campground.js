// ===========================
// Campground Routes
// ===========================
var express = require("express");
var router = express.Router();
var campground = require("../models/campground.model");

//Index Route: Route to display all the campgrounds in the database
router.get("/", (req, res) => {
  campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log("Error in displaying the campgrounds");
    } else {
      res.render("campground/index", { campgrounds: allCampgrounds });
    }
  });
});

//New: route to display the form
router.get("/new", (req, res) => {
  res.render("campground/new");
});

//Create Route: create new campground
router.post("/", (req, res) => {
  var newCampground = { name: req.body.name, image: req.body.img, description: req.body.desc };
  campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log("Error creating campground");
    } else {
      console.log("Campground added");
      console.log(campground);
      res.redirect("/campgrounds");
    }
  });
});

//Show: Route to display one campground
router.get("/:id", (req, res) => {
  // Find the campground
  campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log("Error in diplaying the desired Campground");
      console.log(err);
    } else {
      // Render the template
      console.log("Campground found!");
      //console.log(foundCampground);
      res.render("campground/show", { campground: foundCampground });
    }
  });
});

module.exports = router;