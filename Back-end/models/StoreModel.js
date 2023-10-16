var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var store = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  minimumPurchasePriceAmount: {
    type: String,
    required: true,
  },
  minimumFreeShippingPrice: {
    type: String,
    required: true,
  },
  storeSales: {
    type: String,
  },
  productsInStore: [
    {
      _id: {
        type: String,
        required: true,
      },
      price: {
        type: String,
      },
      discount: {
        type: String,
      },
      inventory: {
        type: String,
      },
      product: { type: Schema.Types.String, ref: "products" },
    },
  ],
  deliverySchedule: [
    {
      timeRange: { type: Schema.Types.String, ref: "deliveryschedules" },
      price: {
        type: String,
        require: true,
      },
      discount: {
        type: String,
        default: 0,
      },
      day: {
        type: String,
        require: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
  ],

  //   supervisor: [{ type: Schema.Types.String, ref: "supervisors" }],
  //   manager: [{ type: Schema.Types.String, ref: "managers" }],
  class: { type: Schema.Types.String, ref: "classes" },
  categories: [{ type: Schema.Types.String, ref: "categories" }],
  ordersAwaitingPayment: [{ type: Schema.Types.String, ref: "orders" }],
  ordersAreBeingProcessed: [{ type: Schema.Types.String, ref: "orders" }],
  ordersDelivered: [{ type: Schema.Types.String, ref: "orders" }],
  returnOrders: [{ type: Schema.Types.String, ref: "orders" }],
  ordersCanceled: [{ type: Schema.Types.String, ref: "orders" }],
});

// make unique index

store.plugin(timestamps);

var storeModel = mongoose.model("Stores", store);

module.exports = storeModel;
