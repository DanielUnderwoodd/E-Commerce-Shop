const randomInt = require("random-int");
const nodemailer = require("../config/nodeMailer");
const { vonage } = require("./otpConfig");

const verificationCode = async (req, res, client, Model, role) => {
  const { email } = req.body;
  const randomNum = randomInt(10000, 100000);
  // const from = "Vonage APIs";
  // const to = "358" + phoneNumber.toString();
  // const text = "Your verification code is:" + randomNum;

  try {
    console.log(randomNum);
    //console.log(req);
    // const response = await vonage.sms.send({ to, from, text });
    // let { status } = response.messages[0];
    let status = "0";
    if (status === "0") {
      client.setex(email, 600, randomNum, async () => {
        try {
          switch (role) {
            case "customer":
              let status = {};

              let findResponseCustomer = await Model.findOne({
                email: req.body.email,
              });
              if (findResponseCustomer) {
                status.isRegistered = true;
                res.status(200).json(status);
              } else {
                status.isRegistered = false;
                res.status(200).json(status);
              }
              var message = nodemailer.message;
                message.to = email;
                message.text = "Your verification code is:" + randomNum;

                nodemailer.transporter.sendMail(message, (error, info) => {
                  if (error) {
                    res.status(500).json(error);
                  } else {
                    res
                      .status(200)
                      .json(
                        "verification code has been sent successfully"
                      );
                  }
                });
              break;
            case "admin":
              let findResponseAdmin = await Model.findOne({
                email: req.body.email,
              });
              if (findResponseAdmin) {
                var message = nodemailer.message;
                message.to = findResponseAdmin.email;
                message.text = "Your verification code is:" + randomNum;

                nodemailer.transporter.sendMail(message, (error, info) => {
                  if (error) {
                    console.log(error);
                    res.status(500).json(error);
                  } else {
                    console.log("OK");
                    res
                      .status(200)
                      .json(
                        "verification code has been sent successfully"
                      );
                  }
                });
              } else {
                res
                  .status(200)
                  .json("verification code has been sent successfully");
              }
          }
        } catch (err) {
          console.log(err);
          res.status(400).json(err);
        }
      });
    } else {
      res.status(500).json("cant fullfill the request");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = verificationCode;
