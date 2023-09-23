const passport = require("passport");
const Customers = require("../models/customerModel");
const JwtStrategy = require("passport-jwt").Strategy;
const authenticateSession = require("./authenticateSession");

const authJwt = (client) => {
  passport.use(
    "customer_private",
    new JwtStrategy(
      {
        secretOrKey: "top_secret",
        jwtFromRequest: (req) => req.cookies.jwtCustomer,
      },
      async (token, done) => {
        try {
          let authData = {
            sessionId: token.customer.sessionId,
            phoneNumber: token.customer.phoneNumber,
          };
          authenticateSession(Customers, authData, client, done, token);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = authJwt;
