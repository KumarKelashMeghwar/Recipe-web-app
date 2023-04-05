import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState({});
  const [imgAttrib, setImageAttrib] = useState("upload-image.png");

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

  function toBase64(arr) {
    return btoa(
      arr?.reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
  }

  useEffect(() => {
    const getData = async () => {
      let emailFound = JSON.parse(localStorage.getItem("user")).email;

      let res = await fetch("http://localhost:2040/get_user", {
        method: "POST",
        body: JSON.stringify({ email: emailFound }),
        headers: {
          "Content-Type": "application/json",
          authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
      let data = await res.json();

      let imgSrc = `data:image/png;base64,${toBase64(
        data?.avatar?.data?.data
      )}`;
      data.avatar && setImageAttrib(imgSrc);
      setFName(data.fname);
      setLName(data.lname);
      setEmail(data.email);
      let newDate = moment(data.birthday).format("YYYY-MM-DD");
      setBirthday(newDate);
      setPassword("");
      setRPassword("");
    };

    getData();

    // eslint-disable-next-line
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

  const saveHandler = async (e) => {
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

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthday", birthday);

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: JSON.parse(localStorage.getItem("token")),
      },
    };
    const URL = "http://localhost:2040/update_user";

    axios
      .post(URL, formData, config)
      .then((response) => {
        alert("Profile uploaded successfully");
        console.log(response);
      })
      .catch((error) => {
        console.log("Error while uploading image" + error);
      });
  };
  return (
    <div className="container">
      <div className="profile-head">
        <div className="heading">My Profile</div>
        <div className="profileLine"></div>
      </div>
      <div className="profile-body">
        <div className="profile1">
          <form action="" autoComplete="off">
            <div className="uploadAvatar">
              <img
                src={imgAttrib}
                alt="profile-pic"
                id="photo"
                htmlFor="file"
              />
              <input
                onChange={selectFileHandler}
                type="file"
                name="image"
                accept="image/*"
                id="file"
                style={{ display: "none" }}
              />

              <label htmlFor="file" className="changeBtn">
                Change Avatar
              </label>
            </div>
          </form>
        </div>
        <div className="profile2">
          <div className="profileUp1">
            <div className="profileFlex1">
              <form action="" autoComplete="off">
                <label htmlFor="fname">First Name</label>
                <input
                  autoComplete="off"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                  type="text"
                  id="fname"
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
            <div className="profileFlex2">
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
          <div className="profileUp2">
            <button onClick={saveHandler}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
