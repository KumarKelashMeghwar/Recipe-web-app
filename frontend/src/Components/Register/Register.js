import React, { useState } from "react";
import moment from "moment";
import "./Register.css";

const Register = () => {
  let [fname, setFName] = useState("");
  let [lname, setLName] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [birthday, setBirthday] = useState("");
  let [rPassword, setRPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const registerUser = async (e) => {
    e.preventDefault();

    let myDate = moment(birthday).format("DD-MM-YYYY");
    let year = myDate.split("-")[2];

    let curDate = new Date();
    let curYear = curDate.getFullYear();
    let age = curYear - year;

    if (year >= curYear) {
      alert("Please insert valid date!");
      return;
    }

    if (age < 15) {
      alert("Hey, you should be atleat 15 years old to use this website!");
      return;
    }

    if (!password || !fname || !lname || !rPassword || !email || !birthday) {
      alert("Please fill out all fields");
      return;
    }
    if (lname.length < 3 || !lname) {
      alert("Last name must be at least 3 characters");
      return;
    }
    if (fname.length < 3 || !fname) {
      alert("First Name must be at least 3 characters");
      return;
    }
    if (password !== rPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 5) {
      alert("Password must be at least 5 characters");
      return;
    }

    if (!email.includes("@") || !validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    let response = await fetch("http://localhost:2040/register", {
      method: "POST",
      body: JSON.stringify({ fname, birthday, lname, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    alert(response);
  };
  return (
    <div className="container">
      <div className="register-head">
        <div className="heading">Create Account</div>
        <div className="registerline"></div>
      </div>
      <div className="register-body">
        <div className="part1">
          <h1>
            <span>Create your</span> <br />
            <span
              style={{
                color: "#626262",
              }}
            >
              account
            </span>
          </h1>
          <div className="description">
            All the Lorem Ipsum generators on the Internet tend to repeat
            predefined chunks as necessary, making this the first true generator
            on the Internet. It uses a dictionary of over 200 Latin words,
            combined with a handful of model sentence structures, to generate
            Lorem Ipsum which looks reasonable.
          </div>
        </div>
        <div className="partt2">
          <div className="up1">
            <div className="flex1">
              <form action="" autoComplete="off">
                <label htmlFor="fname">First Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  id="fname"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                  autoComplete="off"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="Password">Password</label>
                <input
                  autoComplete="off"
                  type="password"
                  id="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </form>
            </div>
            <div className="flex2">
              <form action="" autoComplete="off">
                <label htmlFor="lname">Last Name</label>
                <input
                  autoComplete="off"
                  type="text"
                  id="lname"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                />
                <label htmlFor="birthday">Birthday</label>
                <input
                  autoComplete="off"
                  type="date"
                  id="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
                <label htmlFor="RPassword">Repeat Password</label>
                <input
                  autoComplete="off"
                  type="password"
                  id="RPassword"
                  value={rPassword}
                  onChange={(e) => setRPassword(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="up2">
            <button onClick={registerUser}>Create Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
