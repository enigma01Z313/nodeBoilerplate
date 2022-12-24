const mongoose = require("mongoose");
const MainSchema = require("./_main");

const calculatorSchema = new MainSchema({
  ownerId: {
    type: String,
    required: true,
  },
  totalAsset: {
    type: Number,
    required: true,
  },
  rows: [
    {
      coinId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      entry: {
        type: Number,
        required: true,
      },
      sl: {
        type: Number,
        required: true,
      },
      tp: {
        type: Number,
        required: true,
      },
      totalMargin: {
        type: Number,
        required: true,
      },
      risk: {
        type: Number,
        required: true,
      },
      totalRisk: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Calculator", calculatorSchema);
