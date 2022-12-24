const mongoose = require("mongoose");
const MainSchema = require("./_main");
const orderObj = require("./_orderObj");

const orderSchema = new MainSchema(orderObj);

module.exports = mongoose.model("Order", orderSchema);
