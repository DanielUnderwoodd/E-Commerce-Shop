var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var category = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  class: { type: Schema.Types.String, ref: "classes" },
  subCategory: [{ type: Schema.Types.String, ref: "subcategories" }],
});

category.plugin(timestamps);

var categoryModel = mongoose.model("categories", category);

module.exports = categoryModel;
