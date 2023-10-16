var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var deliverySchedule = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

deliverySchedule.plugin(timestamps);

var deliveryScheduleModel = mongoose.model(
  "deliveryschedules",
  deliverySchedule
);

module.exports = deliveryScheduleModel;
