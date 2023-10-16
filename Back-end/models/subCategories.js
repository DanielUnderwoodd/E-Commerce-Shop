var timestamps = require("mongoose-timestamp");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var subCategory = Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

subCategory.plugin(timestamps);

var subCategoryModel = mongoose.model("subcategories", subCategory);

module.exports = subCategoryModel;
