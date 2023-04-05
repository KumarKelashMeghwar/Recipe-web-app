const User = require("../models/User.js");
const bcrypt = require("bcrypt");

const { sendEmailNow } = require("../Emails/Email.js");

const sendVerificationEmail = async (fname, email, user_id) => {
  try {
    let hreff = "http://localhost:3000/verifyemail?userid=" + user_id;
    let verifyEmailOptions = {
      from: "kumarkelash875@gmail.com",
      to: email,
      subject: "Verify your email",

      html: `<h2>Hello, ${fname}!</h2><h3 style="color:blue;">Verify your email:</h3> </br> <h4>Kindly click on this <a href=${hreff}>link</a> to verify your email!</h4> </br> <p>Best Regards,<br> Kumar Kelash</p>`,
    };

    sendEmailNow(verifyEmailOptions)
      .then((result) => console.log("Email has been sent", result))
      .catch((error) => console.log("Error while sending email: ", error));
  } catch (error) {
    console.log(error.message);
  }
};

async function securePassword(password) {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    console.log("Error : " + error.message);
  }
}

const AddUser = async (req, res) => {
  let { fname, lname, birthday, email, password } = req.body;

  password = await securePassword(password);
  let user = await User.findOne({ email });

  if (fname && password && email && lname && birthday) {
    if (user) {
      res.json(
        "This user has already been registered! Just login via same email!"
      );
    } else {
      let addUser = new User({
        fname,
        email,
        lname,
        birthday,
        password,
      });
      let result = await addUser.save();
      sendVerificationEmail(fname, email, result._id);
      if (result) {
        res.json(
          "You are registered successfully! and you need to verify your email in order to access login"
        );
      } else {
        res.json("User registration failed!");
      }
    }
  } else {
    res.send("Please provide all field to register the user!");
  }
};

module.exports = { AddUser };
