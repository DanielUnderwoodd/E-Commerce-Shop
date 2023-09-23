const mongoose = require("mongoose");
var mongoDB = "mongodb://127.0.0.1/test";
mongoose.set("debug", true);

mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

var db = mongoose.connection;

module.exports = db;
