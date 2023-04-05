const Recipe = require("../models/Recipe");

const AddStar = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ name: req.body.name });
    if (recipe) {
      recipe.stars += 1;
      recipe.starred = true;
      await recipe.save();
      res.json({
        message: "Recipe starred successfully",
        recipe,
      });
    } else {
      res.json({
        message: "Recipe not found",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { AddStar };
