var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var newClass = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  properties: [String],
});

newClass.plugin(timestamps);

newClass.index({ name: 1 }, { unique: true });

var newClassModel = mongoose.model("classes", newClass);

module.exports = newClassModel;
