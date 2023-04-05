import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import "./MyRecipes.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { SELECT, EMPTY } from "../../redux/actions/actions";
import { useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    let userId = JSON.parse(localStorage.getItem("user"))._id;

    let res = await fetch("http:///localhost:2040/get_recipes", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    res = await res.json();
    if (res.recipes && res.recipes.length > 0) {
      setRecipes(res.recipes);
    } else if (res.message) {
      console.log(res.message);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const deletRecipe = async (name) => {
    let response = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (response) {
      let res = await fetch("http:///localhost:2040/delete_recipe", {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      res = await res.json();
      alert(res.message);
      getData();
    } else {
      return;
    }
  };

  return (
    <div className="container">
      <div className="Recipe-head">
        <div className="heading">My Recipes</div>
        <div className="RecipeLine"></div>
        <div>
          <Link to={"/add-recipe"}>
            <AiOutlinePlus
              className="add-recipe"
              onClick={() => {
                dispatch(SELECT());
              }}
            />
          </Link>
        </div>
      </div>
      <div className="Recipe-body">
        <table>
          <thead>
            <tr>
              <th>Recipe Name</th>
              <th>Category</th>
              <th>Created on</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => {
                let myDate = moment(recipe.date).format("MMMM Do YYYY");
                return (
                  <tr key={index}>
                    <td>{recipe.name}</td>
                    <td className="tdCat">{recipe.category}</td>
                    <td>{myDate}</td>
                    <td className="edit">
                      <BiEdit
                        onClick={() => {
                          dispatch(SELECT(recipe));
                          navigate("/add-recipe");
                        }}
                      />
                    </td>
                    <td>
                      <RiDeleteBin5Line
                        className="delete-recipe"
                        style={{
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          deletRecipe(recipe.name);
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4}>No recipe found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRecipes;
