const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

const SignIn = async (req, res) => {
  let { email, password } = req.body;

  const userData = await User.findOne({ email });

  if (userData) {
    if (
      userData.email === email &&
      bcrypt.compareSync(password, userData.password)
    ) {
      let user = await User.findOne({ email }).select("-password -avatar");
      let userEmail = user.email;
      let is_verified = userData.is_verified;

      try {
        if (!is_verified) throw new Error("Please verify your email first!");
        if (!user) throw new Error("User not found!");
        let token = await Jwt.sign({ userEmail }, process.env.SECRET, {
          expiresIn: "12h",
        });

        res.json({
          message: "User logged in successfully!",
          auth: token,
          user,
        });
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    } else {
      res.json({ message: "Incorrect password or email!" });
    }
  } else {
    res.json({ message: "User not found!" });
  }
};

module.exports = { SignIn };
