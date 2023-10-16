var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newUnit = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

newUnit.plugin(timestamps);

newUnit.index({ name: 1 }, { unique: true });

var newUnitModel = mongoose.model("units", newUnit);

module.exports = newUnitModel;
