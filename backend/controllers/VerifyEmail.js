const User = require("../models/User.js");

const VerifyEmail = async (req, resp) => {
  let userId = req.body.userid;
  let info = await User.findOne({ _id: userId });
  if (info) {
    let updateData = await User.updateOne(
      { _id: userId },
      { $set: { is_verified: 1 } }
    );
    if (updateData) {
      resp.send({ message: "User has been verified!" });
    } else {
      resp.send({ message: "Failed to verify the user!" });
    }
  } else {
    resp.send({ message: "User id does not exist in database (:" });
  }
};

module.exports = { VerifyEmail };
