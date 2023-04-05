import React, { useState, useEffect } from "react";
import "./Card.css";
import { BiTimeFive } from "react-icons/bi";
import { TbToolsKitchen2 } from "react-icons/tb";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BiChevronsRight } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";

const Card = ({
  image,
  desc,
  shortDesc,
  stars,
  title,
  category,
  ptime,
  noOfPeople,
}) => {
  let [starred, setStarred] = useState(false);
  let [recipeStars, setRecipeStars] = useState(0);
  let [display, setDisplay] = useState("none");

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
    let myRecipes = res.recipes?.filter((item) => item.name === title);
    setStarred(myRecipes[0]?.stars);
  };

  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);

  // This code basically convert image binary data array to image
  function toBase64(arr) {
    return btoa(
      arr?.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }
  let imgSrc = `data:image/png;base64,${toBase64(image)}`;

  const detailStyle = {
    display: display,
  };

  function showPopup() {
    if (display === "none") {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      setDisplay("block");
    } else {
      setDisplay("none");
    }
  }

  async function starHandler() {
    setStarred(!starred);
    if (starred) {
      let res = await fetch("http://localhost:2040/remove_star", {
        method: "POST",
        body: JSON.stringify({ name: title }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      let data = await res.json();
      if (data.message) {
        alert(data.message);
        setRecipeStars(data.recipe.stars);
      }
    } else {
      let res = await fetch("http://localhost:2040/add_star", {
        method: "POST",
        body: JSON.stringify({
          name: title,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      let data = await res.json();

      if (data.message) {
        alert(data.message);
        setRecipeStars(data.recipe.stars);
      }
    }
  }
  return (
    <>
      <div className="blur" style={detailStyle}></div>
      <div className="cardDetails" style={detailStyle}>
        <div className="cardDetails-header">
          <div className="detailsTitle">{title}</div>
          <div className="canceIcon">
            <FiDelete
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDisplay("none");
              }}
            />
          </div>
        </div>
        <div className="cardDetails-body">
          <div className="detailsFlex1">
            <div className="detailsImage">
              <img src={imgSrc} alt={title} />
            </div>
            <div className="detailsCategory">
              <div className="detailsCategoryTagline">Best Served For</div>
              <div className="detailsMainCategory">{category}</div>
            </div>
            <div className="detailsRecipeShortDesc">{shortDesc}</div>
            <div className="icons">
              <div className="list1">
                <div className="list time">
                  <BiTimeFive />
                  <div className="time-mins">{ptime} min</div>
                </div>
                <div className="list tools">
                  <TbToolsKitchen2 />
                  <div className="persons">{noOfPeople} persons</div>
                </div>
                <div className="list stars">
                  {starred ? (
                    <AiTwotoneStar
                      onClick={starHandler}
                      style={{ color: "gold", cursor: "pointer" }}
                    />
                  ) : (
                    <AiOutlineStar
                      onClick={starHandler}
                      style={{ cursor: "pointer" }}
                    />
                  )}
                  <div className="star">
                    {recipeStars > 0 ? recipeStars : stars}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="detailsFlex2">
            <div className="detailsHeadline">Recipe Details</div>
            <div className="detailsRecipe">{desc}</div>
          </div>
        </div>
      </div>
      <div className="card-info">
        <div className="image">
          <img src={imgSrc} alt={title} />
          <div className="category">{category}</div>
        </div>
        <div className="card_body">
          <div className="mainpage_name">{title}</div>
          <div className="mainpage_desc">{desc}</div>
          <div className="icons">
            <div className="list1">
              <div className="list time">
                <BiTimeFive />
                <div className="time-mins">{ptime} min</div>
              </div>
              <div className="list tools">
                <TbToolsKitchen2 />
                <div className="persons">{noOfPeople} persons</div>
              </div>
              <div className="list stars">
                {starred ? (
                  <AiTwotoneStar
                    onClick={starHandler}
                    style={{ color: "gold", cursor: "pointer" }}
                  />
                ) : (
                  <AiOutlineStar
                    onClick={starHandler}
                    style={{ cursor: "pointer" }}
                  />
                )}
                <div className="star">
                  {recipeStars > 0 ? recipeStars : stars}
                </div>
              </div>
            </div>
            <div className="list2">
              <div className="right_icon">
                <BiChevronsRight
                  onClick={showPopup}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
