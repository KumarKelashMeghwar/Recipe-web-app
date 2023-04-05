const Recipe = require("../models/Recipe");
const moment = require("moment");

const GetPopularRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    let popularRecipes = recipes.filter((recipe) => {
      if (recipe.stars >= 1) {
        return recipe;
      }
      /*   you can change the number 1 when you have more stars on 
           recipes...it is 1 just for now  testing purpose!
        */
    });

    if (popularRecipes.length > 0) {
      res.json({
        data: popularRecipes,
      });
    } else {
      res.json({
        message: "No popular recipes found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetPopularRecipes };
