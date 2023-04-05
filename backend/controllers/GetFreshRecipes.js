const Recipe = require("../models/Recipe");
const moment = require("moment");

const GetFreshRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    let newRecipes = recipes.filter((recipe) => {
      let recipeDate = moment(recipe.date).format("DD-MM-YYYY");
      let recipeDay = recipeDate.split("-")[0];

      let curDate = moment(new Date()).format("DD-MM-YYYY");
      let currDay = curDate.split("-")[0];

      let timeDiff = currDay - recipeDay;

      if (timeDiff <= 7) {
        return recipe;
      }
    });

    if (newRecipes.length > 0) {
      res.json({
        data: newRecipes,
      });
    } else {
      res.json({
        message: "No fresh recipes found",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { GetFreshRecipes };
