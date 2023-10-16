var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var order = Schema({
  _id: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  numberOfItems: {
    type: Number,
    required: true,
  },
  totalOrderAmount: {
    type: String,
    required: true,
  },
  theAmountPayable: {
    type: String,
    required: true,
  },
  cart: [
    {
      price: {
        type: String,
        required: true,
      },
      discount: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      product: { type: Schema.Types.String, ref: "products" },
    },
  ],

  deliverySchedule: {
    timeRange: { type: Schema.Types.String, ref: "deliveryschedules" },
    price: {
      type: String,
      require: true,
    },
    discount: {
      type: String,
      default: 0,
    },
  },
});

order.plugin(timestamps);

var orderModel = mongoose.model("orders", order);

module.exports = orderModel;
