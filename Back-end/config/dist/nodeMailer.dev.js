"use strict";

var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  secure: false,
  auth: {
    user: "fatemebroomandi5@gmail.com",
    pass: "rpal sjpb lhqh vepo"
  },
  tls: {
    rejectUnauthorized: false
  }
});
var message = {
  from: "noreply@domain.com",
  subject: "verifivation code"
};
module.exports = {
  transporter: transporter,
  message: message
};