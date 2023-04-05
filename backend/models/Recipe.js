const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: String,
  recipe_image: {
    data: Buffer,
    contentType: String,
  },
  category: String,
  ptime: Number,
  noOfPeople: Number,
  shortDesc: String,
  recipe: String,
  userId: String,
  date: Date,
  starred: {
    type: Boolean,
    default: false,
  },
  stars: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
