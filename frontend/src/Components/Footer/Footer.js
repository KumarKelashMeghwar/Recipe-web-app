import React from "react";
import "./Footer.css";
import logofooter from "../../Logo/logofooter.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <footer className="container footer">
        <div className="image">
          <img src={logofooter} alt="logofooter" />
        </div>
        <div className="footlinks">
          <ul>
            <li>
              <Link to={"/breakfast"}> BREAKFAST</Link>
            </li>
            <div className="footdot"></div>
            <li>
              <Link to={"/brunch"}> BRUNCH</Link>
            </li>
            <div className="footdot"></div>
            <li>
              <Link to={"/lunch"}> LUNCH</Link>
            </li>
            <div className="footdot"></div>
            <li>
              <Link to={"/dinner"}> DINNER</Link>
            </li>
          </ul>
        </div>
        <div className="copyright">Baby's Food Place Copyright &copy; 2022</div>
      </footer>
    </div>
  );
};

export default Footer;
