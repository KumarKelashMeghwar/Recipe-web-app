import React, { useState, useEffect } from "react";
import "./MainPage.css";

import Card from "../Shared/Card";

const MainPage = () => {
  const [newRecipes, setNewRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  useEffect(() => {
    async function getNewRecipes() {
      let res = await fetch("http://localhost:2040/get_fresh_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      res = await res.json();

      if (res.data && res.data.length > 0) {
        setNewRecipes(res.data);
      }
    }

    async function getPopularRecipes() {
      let res = await fetch("http://localhost:2040/get_popular_recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      res = await res.json();

      if (res.data && res.data.length > 0) {
        setPopularRecipes(res.data);
      }
    }

    getNewRecipes();
    getPopularRecipes();
  }, []);

  return (
    <section className="container mainpage">
      <div className="mainpage-head">
        <div className="heading">Fresh & New</div>
        <div className="line"></div>
      </div>
      <div className="mainpage-body">
        {newRecipes.map((recipe, index) => {
          return (
            <div className="card" key={index}>
              <Card
                title={recipe.name}
                image={recipe.recipe_image.data.data}
                desc={recipe.recipe}
                ptime={recipe.ptime}
                noOfPeople={recipe.noOfPeople}
                shortDesc={recipe.shortDesc}
                category={recipe.category}
                stars={recipe.stars}
              />
            </div>
          );
        })}
      </div>
      <div className="popular-head">
        <div className="heading">Most Popular Recipes</div>
        <div className="popular-line"></div>
      </div>
      <div className="mainpage-body">
        {popularRecipes.map((recipe, index) => {
          return (
            <div className="card" key={index}>
              <Card
                title={recipe.name}
                image={recipe.recipe_image.data.data}
                desc={recipe.recipe}
                shortDesc={recipe.shortDesc}
                ptime={recipe.ptime}
                noOfPeople={recipe.noOfPeople}
                category={recipe.category}
                stars={recipe.stars}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainPage;
