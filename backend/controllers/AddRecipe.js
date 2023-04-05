const Recipe = require("../models/Recipe");
const fs = require("fs");
let filePath = "";

const AddRecipe = async (req, res) => {
  let recipee = await Recipe.findOne({ name: req.body.name });
  if (recipee) {
    res.json({ Response: "Recipe already exists!" });
  } else {
    if (
      req.body.category &&
      req.body.ptime &&
      req.body.name &&
      req.body.noOfPeople &&
      req.body.shortDesc &&
      req.body.recipe &&
      req.body.userId
    ) {
      let recipe = new Recipe({
        category: req.body.category,
        ptime: req.body.ptime,
        name: req.body.name,
        noOfPeople: req.body.noOfPeople,
        shortDesc: req.body.shortDesc,
        recipe: req.body.recipe,
        userId: req.body.userId,
        date: new Date().toLocaleDateString(),
        recipe_image: {
          data: fs.readFileSync(req.file.path),
          contentType: "image/png",
        },
      });
      let result = await recipe.save();

      if (result.category) {
        res.json({ Response: "Recipe added successfully!" });
      } else {
        res.json({ Response: "Recipe not added!" });
      }
    }
  }
};

module.exports = { AddRecipe };
