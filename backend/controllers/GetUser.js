const User = require("../models/User");

const GetUser = async (req, res) => {
  const userData = await User.findOne({ email: req.body.email });

  if (userData) {
    res.json(userData);
  } else {
    res.json({ Response: "User not found!" });
  }
};

module.exports = { GetUser };
