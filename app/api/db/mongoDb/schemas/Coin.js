const mongoose = require("mongoose");
const MainSchema = require("./_main");

const coinSchema = new MainSchema({
  coinId: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Coin", coinSchema);
