import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import MainPage from "./Components/MainPage/MainPage";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Profile from "./Components/Profile/Profile";
import MyRecipes from "./Components/MyRecipes/MyRecipes";
import AddRecipe from "./Components/AddRecipe/AddRecipe";
import VerifyEmail from "./Components/VerifyUser/VerifyEmail";
import Breakfast from "./Components/Breakfast/Breakfast";
import Brunch from "./Components/Brunch/Brunch";
import Lunch from "./Components/Lunch/Lunch";
import Dinner from "./Components/Dinner/Dinner";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<MainPage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/recipes"} element={<MyRecipes />} />
        <Route path={"/add-recipe"} element={<AddRecipe />} />
        <Route path={"/verifyemail"} element={<VerifyEmail />} />
        <Route path={"/breakfast"} element={<Breakfast />} />
        <Route path={"/brunch"} element={<Brunch />} />
        <Route path={"/lunch"} element={<Lunch />} />
        <Route path={"/dinner"} element={<Dinner />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
