const mongoose = require("mongoose");
const MainSchema = require("./_main");
const orderObj = require("./_orderObj");

OrderSchema = new mongoose.Schema(orderObj);

const portfolioSchema = new MainSchema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  orders: [OrderSchema],
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
