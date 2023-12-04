"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var router = express.Router();

var productModel = require("../../models/product");

var OrderModel = require("../../models/order");

router.get("/products", function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(productModel.aggregate([{
            $group: {
              _id: "$category",
              products: {
                $push: "$$ROOT"
              }
            }
          }]).exec());

        case 3:
          products = _context.sent;
          res.status(200).json(products);
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          res.send(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // app.get("/findname", async (req, res)=>{
//   try{
//     if(req.query.name){
//       let singlePerson = await Person.find({name: req.query.name}).exec();
//       return res.json(singlePerson);
//     }else{
//       res.json({error: "No name query found inside request"})
//     }
//   }catch(error){
//     throw error
//   }
// })

router.get("/products/search", function _callee2(req, res) {
  var subjects, regex, newSubjects, findResponse;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          subjects = ["title", "description"];
          regex = new RegExp(req.query.incomingData);
          newSubjects = subjects.map(function (subject) {
            return _defineProperty({}, subject, regex);
          });
          _context2.next = 6;
          return regeneratorRuntime.awrap(productModel.find({
            $or: newSubjects
          }));

        case 6:
          findResponse = _context2.sent;
          res.status(200).json({
            findResponse: findResponse
          });
          _context2.next = 13;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json(_context2.t0);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
module.exports = router;