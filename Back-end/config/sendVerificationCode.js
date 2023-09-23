const randomInt = require("random-int");
const nodemailer = require("../config/nodeMailer");
const { vonage } = require("./otpConfig");

const verificationCode = async (req, res, client, Model, role) => {
  const { phoneNumber } = req.body;
  const randomNum = randomInt(10000, 100000);
  const from = "Vonage APIs";
  const to = "358" + phoneNumber.toString();
  const text = "Your verification code is:" + randomNum;

  try {
    console.log(randomNum);
    // const response = await vonage.sms.send({ to, from, text });
    // let { status } = response.messages[0];
    let status = "0";
    if (status === "0") {
      client.setex(req.body.phoneNumber, 600, randomNum, async () => {
        try {
          switch (role) {
            case "customer":
              let status = {};

              let findResponseCustomer = await Model.findOne({
                phoneNumber: req.body.phoneNumber,
              });
              if (findResponseCustomer) {
                status.isRegistered = true;
                res.status(200).json(status);
              } else {
                status.isRegistered = false;
                res.status(200).json(status);
              }
              break;
          }
        } catch (err) {
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
