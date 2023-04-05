const Recipe = require("../models/Recipe");

const GetAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json({ recipes });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { GetAllRecipes };
