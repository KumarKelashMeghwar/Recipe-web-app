const User = require("../models/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
let filePath = "";

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log("Error : " + error.message);
  }
}

const UpdateUser = async (req, res) => {
  
  if (req.file) {
    filePath = req.file.path;
  }
  const userData = await User.findOne({ email: req.body.email });

  if (!userData) {
    res.json({ Response: "You can't alter any other's profile!" });
  } else {
    if (
      req.body.fname &&
      req.body.lname &&
      req.body.birthday &&
      req.body.password &&
      req.body.email
    ) {
      let user = await User.updateOne({
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        password: await securePassword(req.body.password),
        avatar: {
          data: fs.readFileSync(filePath),
          contentType: "image/png",
        },
      });
      let result = await user;
      if (result.acknowledged) {
        res.json({ Response: "User updated successfully!" });
      } else {
        res.json({ Response: "User not updated!" });
      }
    }
  }
};

module.exports = { UpdateUser };
