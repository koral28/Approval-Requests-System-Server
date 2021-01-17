var express = require("express");
var router = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");

router.get("/", function (req, res, next) {
  res.send("Server Check");
});

router.get("/conformition", function (req, res, next) {
  res.redirect(`http://localhost:3001/confirmationEmail`);
});

/* GET home page. */
router.post("/", function (req, res, next) {
  let emailsForApproval = req.body.emailsArray;
  let urlEmail = req.body.projectState.url;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  emailsForApproval.forEach((element) => {
    const url = `http://localhost:8080/conformition`;
    mailOptions = {
      from: "koral.levi22@gmail.com",
      to: element,
      subject: "Approval Mail Request",
      html:
        "To confirm the request please click <p></p> <a href=" +
        url +
        "><span>" +
        urlEmail +
        "</span>",
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("email sent!");
        return res.status(200).json({ success: true });
      }
    });
  });
});

module.exports = router;
