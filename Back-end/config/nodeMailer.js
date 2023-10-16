const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  secure: false,
  auth: {
    user: "drainbow766@gmail.com",
    pass: "Daniel1376",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

var message = {
  from: "noreply@domain.com",
  subject: "verifivation code",
};

module.exports = {
  transporter,
  message,
};
