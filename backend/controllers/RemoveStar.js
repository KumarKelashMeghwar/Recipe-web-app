const Recipe = require("../models/Recipe");

const RemoveStar = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ name: req.body.name });
    if (recipe) {
      if (recipe.stars > 0) {
        recipe.stars -= 1;
      }
      recipe.starred = false;
      await recipe.save();
      res.json({
        message: "Recipe unstarred successfully",
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

module.exports = { RemoveStar };
