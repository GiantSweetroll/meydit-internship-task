const nodemailer = require("nodemailer")
require('dotenv').config();

async function sendMail(mailInfo) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // send mail with defined transport object
  return await transporter.sendMail(mailInfo);
}

module.exports = {
  sendMail
}