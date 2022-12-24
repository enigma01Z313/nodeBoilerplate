const mongoose = require("mongoose");
const MainSchema = require("./_main");

const assetSchema = new MainSchema(
  {
    userId: {
      type: String,
      required: true,
    },
    current: {
      type: Number,
      default: 0,
    },
    history: [
      {
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          required: true,
          default: "manual",
        },
        createdAt: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  (doc, ret) => {
    // ret.current = ret.history.reduce((acc, { amount }) => acc + amount, 0);
    delete ret._id;
    delete ret.__v;
  }
);

module.exports = mongoose.model("Asset", assetSchema);
