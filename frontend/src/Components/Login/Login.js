import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate();
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !email) {
      alert("Email is invalid");
      return;
    }

    if (!password || password.length < 5) {
      alert("Password must be at least 5 characters");
      return;
    }

    let response = await fetch("http://localhost:2040/signIn", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    alert(response.message);

    if (response.auth) {
      localStorage.clear();
      localStorage.setItem("token", JSON.stringify(response.auth));
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
      window.location.reload();
    } else {
      localStorage.clear();
      alert(response.message);
    }
  };
  return (
    <div className="container">
      <div className="login-head">
        <div className="heading">Log In</div>
        <div className="loginline"></div>
      </div>
      <div className="login-body">
        <div className="part1">
          <h1>
            <span>Welcome to</span> Baby's
          </h1>
          <div className="description">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is
            therefore always free from repetition, injected humour, or
            non-characteristic words etc.
          </div>
        </div>
        <div className="part2">
          <form action="" autoComplete="off">
            <label className="email" htmlFor="email">
              Email
            </label>
            <input
              autoComplete="off"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="password" htmlFor="Password">
              Password
            </label>
            <input
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
            <button className="login-btn" onClick={loginHandler}>
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
