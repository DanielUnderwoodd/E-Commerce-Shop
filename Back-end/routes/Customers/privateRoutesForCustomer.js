const express = require("express");
const uniqid = require("uniqid");
//const order = require('../../models/order.js');

const router = express.Router();
const { userValidationRules, validate } = require("../../validator/user.js");
const { addAddressValidationRules } = require("../../validator/addAddress");
const OrderModel = require("../../models/order");
module.exports = (Customers, sessionCustomers, client, jwt) => {
  // log out current customer
  router.get("/logout", async (req, res) => {
    try {
      let terminateSession = await Customers.updateOne(
        {
          _id: req.user.customer._id,
        },
        {
          $pull: {
            session: req.user.customer.sessionId,
          },
        }
      );
      if (terminateSession.nModified === 1) {
        let removeSession = await sessionCustomers.deleteOne({
          _id: req.user.customer.sessionId,
        });
        if (removeSession.deletedCount === 1) {
          res.clearCookie("jwtCustomer");
          console.log("you are logout successfully");
          res.status(200).json("you are logout successfully");
        }
      } else {
        res.status(500).json("failed to update db");
      }
    } catch (err) {
      console.log(`error ocur in customer/pv/logout GET Method: ${err}`);
      res.status(500).json(err);
    }
  });

  // update user profile
  router.put("/profile", userValidationRules(), validate, async (req, res) => {
    let query = {
      _id: req.user.customer._id,
    };
    let updateCustomer = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    try {
      let updateCustomerProfile = await Customers.findOneAndUpdate(
        query,
        updateCustomer,
        {
          new: true,
        }
      );
      if (updateCustomerProfile) {
        let customer = {
          firstName: updateCustomerProfile.firstName,
          lastName: updateCustomerProfile.lastName,
          email: updateCustomerProfile.email,
        };
        res.status(200).json({
          msg: "Profile has been updated",
          customer,
        });
      } else {
        res.status(500).json("Profile has not been updated, try agian");
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(`error ocur in customer/pv/profile put Method: ${err}`);
    }
  });
  router.post(
    "/add-address",
    //addAddressValidationRules(),
    validate,
    async (req, res) => {
      let address = {
        _id: uniqid(),
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
        lat: req.body.lat,
        lng: req.body.lng,
      };

      let query = {
        _id: req.user.customer._id,
        "address.lat": address.lat,
        "address.lng": address.lng,
      };
      try {
        let isAddressExist = await Customers.findOne(query).select({
          address: 1,
          _id: 0,
        });

        if (isAddressExist !== null) {
          return res.status(500).json("This address id Currently avaiable");
        } else if (
          isAddressExist !== null &&
          isAddressExist.address.length === 8
        ) {
          return res.status(500).json("You just can add 8 addresses");
        }
        let addAddressResponse = await Customers.findOneAndUpdate(
          query._id,
          {
            $push: {
              address,
            },
          },
          {
            new: true,
          }
        );
        if (addAddressResponse) {
          res.status(200).json({
            msg: "address addedd succesfully",
            address: addAddressResponse.address,
          });
        } else {
          res.status(500).json("Try Again");
        }
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
        console.log(
          `error ocur in customer/pv/add-address post Method: ${err}`
        );
      }
    }
  );
  router.put(
    "/add-address",
    //addAddressValidationRules(),
    validate,
    async (req, res) => {
      let address = {
        phoneNumber: req.body.phoneNumber,
        location: req.body.location,
      };

      let queryCustomerAddressId = {
        "address._id": req.body._id,
      };
      try {
        let updateAddressResponse = await Customers.findOneAndUpdate(
          queryCustomerAddressId,
          {
            $set: {
              "address.$.phoneNumber": address.phoneNumber,
              "address.$.location": address.location,
            },
          },
          {
            new: true,
          }
        );
        if (updateAddressResponse) {
          res.status(200).json({
            msg: "Address has been updated",
            address: updateAddressResponse.address,
          });
        } else {
          res.status(500).json("Address has not been updated, try again");
        }
      } catch (err) {
        res.status(500).json(err);
        console.log(`error ocur in customer/pv/add-address put Method: ${err}`);
      }
    }
  );
  router.delete("/add-address", async (req, res) => {
    const { locationId } = req.body;
    try {
      let removeAddressResponse = await Customers.findOneAndUpdate(
        {
          _id: req.user.customer._id,
        },
        {
          $pull: {
            address: {
              _id: locationId,
            },
          },
        },
        {
          new: true,
        }
      );
      if (locationId) {
        console.log(removeAddressResponse);
        res.status(200).json({
          msg: "Address has been deleted",
          address: removeAddressResponse.address,
        });
      } else {
        res.status(500).json("Address has not been deleted, try agian");
      }
    } catch (err) {
      res.status(500).json(err);
      console.log(
        `error ocur in customer/pv/add-address delete Method: ${err}`
      );
    }
  });


  router.post(
    "/check-out",
  
    async (req, res) => {
      // console.log(order);

      // console.log(req.body.address);
      // console.log(req.body.is_payed);
      // console.log(req.body.totalPrice);
      // //console.log(req.body.userEmail);
      // console.log(req.body.products);
      // console.log(req.body.productsCount);
  
      try {
        let userFound = await Customers.findOne({
                  email: req.body.userEmail,
                });
                if(userFound){
                  const newOrder = new OrderModel({
                    _id : uniqid(),
                    userEmail: req.body.userEmail,
                    address: req.body.address,
                    productsCount: req.body.productsCount,
                    totalPrice: req.body.totalPrice,
                    isPayed: req.body.is_payed,
                    products: req.body.products
                  });
                  
                  await newOrder.save(function (err, result) {
                    console.log(err, result)
                    res.status(200).json({
                          msg: "order has been added",
                          result: result,
                        });
                    });

//                   const User = require('../models/user.js');    

// var user = new User({
//   a: 'abc'
// });

// user.save(function (err, results) {
//   console.log(results._id);
// });
                }else{ console.log(3);}

        // let checkoutResponse = await Customers.findOneAndUpdate(
        //   queryCustomerAddressId,
        //   {
        //     $set: {
        //       "address.$.phoneNumber": address.phoneNumber,
        //       "address.$.location": address.location,
        //     },
        //   },
        //   {
        //     new: true,
        //   }
        // );
        // if (checkoutResponse) {
        //   res.status(200).json({
        //     msg: "Address has been updated",
        //     address: checkoutResponse.address,
        //   });
        // } else {
        //   res.status(500).json("Address has not been updated, try again");
        // }
      } catch (err) {
        res.status(500).json(err);
        console.log(`error ocur in customer/pv/add-address put Method: ${err}`);
      }
    }
  );

router.post("/orders", async (req, res) => {
  console.log(req.body);
  try {
    let orders = await OrderModel.find( {userEmail: req.body.userEmail} ).exec();
    res.status(200).json(orders);
  } catch (err) {
    res.send(err);
  }
});
  return router;
};
