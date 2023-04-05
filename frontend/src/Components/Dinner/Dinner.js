import React, { useState, useEffect } from "react";
import Card from "../Shared/Card";

const Dinner = () => {
  const [recipes, setRecipes] = useState([]);
  const getData = async () => {
    let res = await fetch("http:///localhost:2040/getAllRecipes", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    res = await res.json();

    if (res.recipes && res.recipes.length > 0) {
      let dinnerRecipes = res.recipes.filter((item) => {
        return item.category === "Dinner";
      });
      setRecipes(dinnerRecipes);
    } else if (res.message) {
      console.log(res.message);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container">
      <div className="mainpage-head">
        <div className="heading">Dinner</div>
        <div className="line"></div>
      </div>
      <div className="mainpage-body">
        {recipes &&
          recipes.map((item) => {
            return (
              <div className="card" key={item.id}>
                <Card
                  category={item.category}
                  desc={item.recipe}
                  title={item.name}
                  shortDesc={item.shortDesc}
                  ptime={item.ptime}
                  noOfPeople={item.noOfPeople}
                  image={item.recipe_image.data.data}
                  stars={item.stars}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dinner;
