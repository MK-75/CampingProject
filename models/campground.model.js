var mongoose = require("mongoose");
var Comment = require("./comments.model");

var campgroundSchema = mongoose.Schema({
  name: String,
  description: String,
  image: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("campground", campgroundSchema);
