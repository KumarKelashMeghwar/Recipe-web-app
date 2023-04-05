import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logoheader from "../../Logo/logoheader.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  let [data, setData] = useState([]);

  useEffect(() => {
    let res = localStorage.getItem("token");
    if (res) {
      setData(JSON.parse(res));
    }
  }, []);

  return (
    <nav className="container">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to={"/"}>
            <img src={logoheader} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/breakfast"}> BREAKFAST</Link>
            </li>
            <div className="dot"></div>
            <li>
              <Link to={"/brunch"}> BRUNCH</Link>
            </li>
            <div className="dot"></div>
            <li>
              <Link to={"/lunch"}> LUNCH</Link>
            </li>
            <div className="dot"></div>
            <li>
              <Link to={"/dinner"}> DINNER</Link>
            </li>
          </ul>
        </div>
        <div className="buttons">
          {data.length <= 0 ? (
            <>
              <Link to={"/login"}>
                <div className="btn loginBtn">LOG IN</div>
              </Link>
              <div className="or">or</div>
              <Link to="/register">
                <div className="btn accBtn">CREATE ACCOUNT</div>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/recipes"}>
                <div className="myRecipes btDiv green">MY RECIPES</div>
              </Link>
              <div className="doti"></div>
              <Link to="/profile">
                <div className="myProfile btDiv orange">MY PROFILE</div>
              </Link>
              <div className="doti"></div>
              <Link
                to="/"
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                <div className="logoutDiv btDiv">LOG OUT</div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
