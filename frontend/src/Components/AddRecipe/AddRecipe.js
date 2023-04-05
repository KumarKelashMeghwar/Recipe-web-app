import React, { useState, useEffect } from "react";
import "./AddRecipe.css";
import axios from "axios";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";

const AddRecipe = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [imgAttrib, setImageAttrib] = useState("upload-image.png");
  const [name, setName] = useState("");
  const [noOfPeople, setNofOfPeople] = useState(0);
  const [shortDesc, setShortDesc] = useState("");
  const [recipe, setRecipe] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [ptime, setPTime] = useState(0);
  // let [myRecipe, setMyRecipe] = useState();

  const newRecipe = useSelector((state) => state.selectReducer.recipes[0]);

  function toBase64(arrr) {
    return btoa(
      arrr.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  useEffect(() => {
    setName(newRecipe?.name);
    setCategory(newRecipe?.category);
    setPTime(newRecipe?.ptime);
    setNofOfPeople(newRecipe?.noOfPeople);
    setShortDesc(newRecipe?.shortDesc);
    setRecipe(newRecipe?.recipe);

    newRecipe &&
      setImageAttrib(
        `data:image/png;base64,${toBase64(newRecipe?.recipe_image.data.data)}`
      );
  }, []);

  function selectFileHandler(e) {
    setSelectedFile(e.target.files[0]);

    if (selectedFile) {
      const reader = new FileReader();
      if (selectedFile) {
        reader.readAsDataURL(e.target.files[0]);
      }
      reader.addEventListener("load", () => {
        setImageAttrib(reader.result);
      });
    }
  }

  const saveNow = async (e) => {
    e.preventDefault();

    if (!name || !shortDesc || !recipe || !category || !ptime || !noOfPeople) {
      alert("Please fill out all fields");
      return;
    }

    if (!name || name.length < 3) {
      alert("Name must be at least 3 characters");
      return;
    }

    if (!shortDesc || shortDesc.length < 10) {
      alert("Short description must be at least 10 characters");
      return;
    }

    if (!recipe || recipe.length < 10) {
      alert("Recipe must be at least 10 characters");
      return;
    }
    if (!category || category.length < 3) {
      alert("Category must be at least 3 characters");
      return;
    }
    if (!ptime || ptime < 1) {
      alert("Please enter a valid time");
      return;
    }
    if (!noOfPeople || noOfPeople < 1) {
      alert("Please enter a valid number of people");
      return;
    }

    let userId = JSON.parse(localStorage.getItem("user"))._id;

    const URL = "http://localhost:2040/add_recipe";
    const formData = new FormData();

    formData.append("recipe_image", selectedFile);
    formData.append("name", name);
    formData.append("shortDesc", shortDesc);
    formData.append("recipe", recipe);
    formData.append("category", category);
    formData.append("ptime", ptime);
    formData.append("noOfPeople", noOfPeople);
    formData.append("userId", userId);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };

    let res = await axios.post(URL, formData, config);

    alert(res.data.Response);
  };
  return (
    <div className="container">
      <div className="Recipe-head">
        <div className="heading">My Recipes</div>
        <div className="RecipeLine"></div>
        <div>
          <Link to={"/recipes"}>
            <TiArrowBack className="add-recipe" />
          </Link>
        </div>
      </div>
      <div className="AddRecipe-body">
        <div className="recipe-part1">
          <div className="recipe-image">
            <div className="recipe-title">Recipe Image</div>
            <div>
              <img
                src={imgAttrib}
                alt="recipe_image"
                htmlFor="file"
                className="recipeImage"
              />
              <input
                onChange={selectFileHandler}
                type="file"
                name="recipe_image"
                accept="image/*"
                id="file"
                style={{ display: "none" }}
              />
              <label htmlFor="file" className="recipe-uploadbtn">
                Upload Image
              </label>
            </div>
          </div>
        </div>
        <div className="recipe-part2">
          <div className="flex_Part1">
            <div className="recipe_title">
              <label htmlFor="RecipeTitle">Recipe Title</label>
              <input
                type="text"
                id="RecipeTitle"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="flex_row">
              <div>
                <label htmlFor="recipe_Category">Category</label>
                <select
                  name="recipe_Category"
                  id="recipe_Category"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="Breakfast">Breakfast</option>
                  <option value="Brunch">Brunch</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                </select>
              </div>
              <div>
                <label htmlFor="recipe_time">Preparation Time</label>
                <input
                  type="number"
                  id="recipe_time"
                  value={ptime}
                  onChange={(e) => {
                    setPTime(e.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="no_of_people">No. People</label>
                <input
                  type="number"
                  id="no_of_people"
                  value={noOfPeople}
                  onChange={(e) => setNofOfPeople(e.target.value)}
                />
              </div>
            </div>
            <div className="recipe_desc">
              <label htmlFor="recipedesc">Short Description</label>
              <textarea
                name="recipedesc"
                id="recipedesc"
                cols="30"
                rows="4"
                style={{ resize: "none" }}
                value={shortDesc}
                onChange={(e) => setShortDesc(e.target.value)}
              ></textarea>
            </div>
            <div className="saveBtn" onClick={saveNow}>
              Save
            </div>
          </div>
          <div className="flex_Part2">
            <label htmlFor="mainRecipe">Recipe</label>
            <textarea
              name="mainRecipe"
              id="mainRecipe"
              cols="30"
              style={{ resize: "none" }}
              rows="13"
              value={recipe}
              onChange={(e) => setRecipe(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRecipe;
