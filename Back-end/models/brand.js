var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var brand = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

brand.plugin(timestamps);

var brandModel = mongoose.model("brands", brand);

module.exports = brandModel;
