const Recipe = require("../models/Recipe");

const DeleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.deleteOne({ name: req.body.name });

    if (recipe.acknowledged) {
      res.json({ message: "Recipe deleted successfully" });
    } else {
      res.json({ message: "Recipe not deleted" });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = { DeleteRecipe };
