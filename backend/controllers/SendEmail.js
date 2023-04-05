const User = require("../models/User.js");
const randomString = require("randomstring");
const { sendEmailNow } = require("../Emails/Email.js");

const SendEmail = async (req, res) => {
  let { email } = req.body;
  let userFound = await User.findOne({ email });

  if (userFound) {
    let sendMailTo = userFound.email;
    let randomStr = randomString.generate();
    const updatedData = await User.updateOne(
      { email },
      { $set: { token: randomStr } }
    );
    let link = `http://localhost:3000/sendmail?token=${randomStr}`;
    let mailOptions = {
      from: {
        name: "MyFriends App",
        email: "phopho97@outlook.com",
      },
      to: sendMailTo,
      subject: "reset your password",
      html: `<h2>Hello, ${userFound.name}!</h2><h3 style="color:blue;">Reset your password:</h3> </br> <h4>Kindly click on this <a href=${link}>link</a> to reset your password!</h4> </br> <p>Best Regards,<br> Kumar Kelash</p>`,
    };
    sendEmailNow(mailOptions)
      .then((result) => console.log("Email has been sent", result))
      .catch((error) => console.log("Error while sending email: ", error));
    res.send({ result: userFound });
  } else {
    res.send({ result: "No user found with this email" });
  }
};

module.exports = { SendEmail };
