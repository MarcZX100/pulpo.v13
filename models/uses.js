const mongoose = require("mongoose");

const cmdu = mongoose.Schema({
  command: String,
  uses: Number
});

module.exports = mongoose.model("Uses", cmdu)