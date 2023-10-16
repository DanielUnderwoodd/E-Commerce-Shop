const passport = require("passport");
const Customers = require("../models/customerModel");
const Admin = require("../models/adminModel");
const JwtStrategy = require("passport-jwt").Strategy;
const authenticateSession = require("./authenticateSession");

const authJwt = (client) => {
  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function (user, done) {
  //   done(null, user);
  // });

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
  passport.use(
    "admin_private",
    new JwtStrategy(
      {
        secretOrKey: "top_secret",
        jwtFromRequest: (req) => req.cookies.jwtAdmin,
      },
      async (token, done) => {
        try {
          let authData = {
            sessionId: token.admin.sessionId,
            phoneNumber: token.admin.phoneNumber,
          };
          authenticateSession(Admin, authData, client, done, token);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

module.exports = authJwt;
