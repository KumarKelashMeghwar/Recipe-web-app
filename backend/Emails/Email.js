require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email sending system
const sendEmailNow = async (mailOptions) => {
  try {
    let result = await sgMail.send(mailOptions);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendEmailNow };
