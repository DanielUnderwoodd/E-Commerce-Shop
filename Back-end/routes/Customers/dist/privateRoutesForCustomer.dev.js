"use strict";

var express = require("express");

var uniqid = require("uniqid"); //const order = require('../../models/order.js');


var router = express.Router();

var _require = require("../../validator/user.js"),
    userValidationRules = _require.userValidationRules,
    validate = _require.validate;

var _require2 = require("../../validator/addAddress"),
    addAddressValidationRules = _require2.addAddressValidationRules;

var OrderModel = require("../../models/order");

module.exports = function (Customers, sessionCustomers, client, jwt) {
  // log out current customer
  router.get("/logout", function _callee(req, res) {
    var terminateSession, removeSession;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(Customers.updateOne({
              _id: req.user.customer._id
            }, {
              $pull: {
                session: req.user.customer.sessionId
              }
            }));

          case 3:
            terminateSession = _context.sent;

            if (!(terminateSession.nModified === 1)) {
              _context.next = 11;
              break;
            }

            _context.next = 7;
            return regeneratorRuntime.awrap(sessionCustomers.deleteOne({
              _id: req.user.customer.sessionId
            }));

          case 7:
            removeSession = _context.sent;

            if (removeSession.deletedCount === 1) {
              res.clearCookie("jwtCustomer");
              console.log("you are logout successfully");
              res.status(200).json("you are logout successfully");
            }

            _context.next = 12;
            break;

          case 11:
            res.status(500).json("failed to update db");

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            console.log("error ocur in customer/pv/logout GET Method: ".concat(_context.t0));
            res.status(500).json(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 14]]);
  }); // update user profile

  router.put("/profile", userValidationRules(), validate, function _callee2(req, res) {
    var query, updateCustomer, updateCustomerProfile, customer;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = {
              _id: req.user.customer._id
            };
            updateCustomer = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email
            };
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(Customers.findOneAndUpdate(query, updateCustomer, {
              "new": true
            }));

          case 5:
            updateCustomerProfile = _context2.sent;

            if (updateCustomerProfile) {
              customer = {
                firstName: updateCustomerProfile.firstName,
                lastName: updateCustomerProfile.lastName,
                email: updateCustomerProfile.email
              };
              res.status(200).json({
                msg: "Profile has been updated",
                customer: customer
              });
            } else {
              res.status(500).json("Profile has not been updated, try agian");
            }

            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            res.status(500).json(_context2.t0);
            console.log("error ocur in customer/pv/profile put Method: ".concat(_context2.t0));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 9]]);
  });
  router.post("/add-address", //addAddressValidationRules(),
  validate, function _callee3(req, res) {
    var address, query, isAddressExist, addAddressResponse;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            address = {
              _id: uniqid(),
              phoneNumber: req.body.phoneNumber,
              location: req.body.location,
              lat: req.body.lat,
              lng: req.body.lng
            };
            query = {
              _id: req.user.customer._id,
              "address.lat": address.lat,
              "address.lng": address.lng
            };
            _context3.prev = 2;
            _context3.next = 5;
            return regeneratorRuntime.awrap(Customers.findOne(query).select({
              address: 1,
              _id: 0
            }));

          case 5:
            isAddressExist = _context3.sent;

            if (!(isAddressExist !== null)) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(500).json("This address id Currently avaiable"));

          case 10:
            if (!(isAddressExist !== null && isAddressExist.address.length === 8)) {
              _context3.next = 12;
              break;
            }

            return _context3.abrupt("return", res.status(500).json("You just can add 8 addresses"));

          case 12:
            _context3.next = 14;
            return regeneratorRuntime.awrap(Customers.findOneAndUpdate(query._id, {
              $push: {
                address: address
              }
            }, {
              "new": true
            }));

          case 14:
            addAddressResponse = _context3.sent;

            if (addAddressResponse) {
              res.status(200).json({
                msg: "address addedd succesfully",
                address: addAddressResponse.address
              });
            } else {
              res.status(500).json("Try Again");
            }

            _context3.next = 23;
            break;

          case 18:
            _context3.prev = 18;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);
            res.status(500).json(_context3.t0);
            console.log("error ocur in customer/pv/add-address post Method: ".concat(_context3.t0));

          case 23:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 18]]);
  });
  router.put("/add-address", //addAddressValidationRules(),
  validate, function _callee4(req, res) {
    var address, queryCustomerAddressId, updateAddressResponse;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            address = {
              phoneNumber: req.body.phoneNumber,
              location: req.body.location
            };
            queryCustomerAddressId = {
              "address._id": req.body._id
            };
            _context4.prev = 2;
            _context4.next = 5;
            return regeneratorRuntime.awrap(Customers.findOneAndUpdate(queryCustomerAddressId, {
              $set: {
                "address.$.phoneNumber": address.phoneNumber,
                "address.$.location": address.location
              }
            }, {
              "new": true
            }));

          case 5:
            updateAddressResponse = _context4.sent;

            if (updateAddressResponse) {
              res.status(200).json({
                msg: "Address has been updated",
                address: updateAddressResponse.address
              });
            } else {
              res.status(500).json("Address has not been updated, try again");
            }

            _context4.next = 13;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](2);
            res.status(500).json(_context4.t0);
            console.log("error ocur in customer/pv/add-address put Method: ".concat(_context4.t0));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[2, 9]]);
  });
  router["delete"]("/add-address", function _callee5(req, res) {
    var locationId, removeAddressResponse;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            locationId = req.body.locationId;
            _context5.prev = 1;
            _context5.next = 4;
            return regeneratorRuntime.awrap(Customers.findOneAndUpdate({
              _id: req.user.customer._id
            }, {
              $pull: {
                address: {
                  _id: locationId
                }
              }
            }, {
              "new": true
            }));

          case 4:
            removeAddressResponse = _context5.sent;

            if (locationId) {
              console.log(removeAddressResponse);
              res.status(200).json({
                msg: "Address has been deleted",
                address: removeAddressResponse.address
              });
            } else {
              res.status(500).json("Address has not been deleted, try agian");
            }

            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.status(500).json(_context5.t0);
            console.log("error ocur in customer/pv/add-address delete Method: ".concat(_context5.t0));

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[1, 8]]);
  });
  router.post("/check-out", function _callee6(req, res) {
    var userFound, newOrder;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(Customers.findOne({
              email: req.body.userEmail
            }));

          case 3:
            userFound = _context6.sent;

            if (!userFound) {
              _context6.next = 10;
              break;
            }

            newOrder = new OrderModel({
              _id: uniqid(),
              userEmail: req.body.userEmail,
              address: req.body.address,
              productsCount: req.body.productsCount,
              totalPrice: req.body.totalPrice,
              isPayed: req.body.is_payed,
              products: req.body.products
            });
            _context6.next = 8;
            return regeneratorRuntime.awrap(newOrder.save(function (err, result) {
              console.log(err, result);
              res.status(200).json({
                msg: "order has been added",
                result: result
              });
            }));

          case 8:
            _context6.next = 11;
            break;

          case 10:
            console.log(3);

          case 11:
            _context6.next = 17;
            break;

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            res.status(500).json(_context6.t0);
            console.log("error ocur in customer/pv/add-address put Method: ".concat(_context6.t0));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 13]]);
  });
  router.post("/orders", function _callee7(req, res) {
    var orders;
    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log(req.body);
            _context7.prev = 1;
            _context7.next = 4;
            return regeneratorRuntime.awrap(OrderModel.find({
              userEmail: req.body.userEmail
            }).exec());

          case 4:
            orders = _context7.sent;
            res.status(200).json(orders);
            _context7.next = 11;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);
            res.send(_context7.t0);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 8]]);
  });
  return router;
};