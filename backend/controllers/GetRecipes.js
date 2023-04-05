const Recipe = require("../models/Recipe");

const GetRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.body.userId });
    res.json({ recipes });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { GetRecipes };
