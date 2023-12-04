var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var order = Schema({
  _id: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  productsCount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  isPayed: {
    type: Boolean,
    required: true,
  },
  products: {
    type: String,
    required: true,
  },
});

order.plugin(timestamps);

var orderModel = mongoose.model("orders", order);

module.exports = orderModel;
