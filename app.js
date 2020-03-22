var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  // campground = require("./models/campground.model"),
  // Comment = require("./models/comments.model"),
  User = require("./models/user.model"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local");

var campgroundRoute = require("./routes/campground"),
  commentRoute = require("./routes/comments")
authRoute = require("./routes/index");

//Passport Configuration
app.use(require("express-session")({
  secret: "Be a champion!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
//console.log(__dirname + "\\public\\stylesheets\\main.css");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use(authRoute);

app.listen(8085, "127.0.0.1", () => {
  console.log("Server started!");
});
