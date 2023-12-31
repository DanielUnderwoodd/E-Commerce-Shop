const uniqid = require("uniqid");

const verifyCodeRegister = (
  req,
  res,
  client,
  userModel,
  userSession,
  jwt,
  role
) => {
  client.del(req.body.phoneNumber, async (err, reply) => {
    if (err) throw err;
    if (reply === 1) {
      var cookieName = "";
      try {
        let user = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          UID: uniqid("UID-"),
        };
        let session = {
          UID: user.UID,
          platform: req.useragent.platform,
          os: req.useragent.os,
          browser: req.useragent.browser,
          version: req.useragent.version,
          ipAddress: req.connection.remoteAddress,
          _id: uniqid(),
        };
        user.session = session._id;

        const newUser = new userModel(user);

        let saveResponse = await newUser.save({
          new: true,
        });

        const newSession = new userSession(session);

        let saveResponseForUserSession = await newSession.save({
          new: true,
        });
        if (saveResponse) {
          var body = {
            _id: saveResponse._id,
            firstName: saveResponse.firstName,
            lastName: saveResponse.lastName,
            email: saveResponse.email,
            sessionId: saveResponseForUserSession._id,
            role: saveResponse.role,
            phoneNumber: saveResponse.phoneNumber,
          };
          switch (role) {
            case "customer":
              cookieName = "jwtCustomer";
              body = {
                ...body,
                address: saveResponse.address,
                status: saveResponse.status,
                balance: saveResponse.balance,
              };
              break;
            case "admin":
              cookieName = "jwtAdmin";
          }

          const token = jwt.sign(
            {
              [role]: body,
              // exp      : Math.floor(Date.now() / 1000) + (60 * 60 * 24)
            },
            "top_secret"
          );
          res.cookie(cookieName, token, { httpOnly: true });
          res.status(200).json(body);
        }
      } catch (err) {
        console.log(err);

        res.status(500).json(err);
      }
    }
  });
};

module.exports = verifyCodeRegister;
