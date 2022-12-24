const mongoose = require("mongoose");
const MainSchema = require("./_main");

const journalSchema = new MainSchema({
  owner: {
    type: String,
    required: true,
  },
  asset: {
    coinId: {
      type: String,
      required: true,
    },
    coinIcon: {
      type: String,
      required: true,
    },
    coinSymbol: {
      type: String,
      required: true,
    },
    coinName: {
      type: String,
      required: true,
    },
  },
  longShort: {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
  amount: {
    type: Number,
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  tp: {
    type: Number,
    required: true,
  },
  sl: {
    type: Number,
    required: true,
  },
  exitPrice: {
    type: Number,
    required: true,
  },
  lowHigh: {
    type: Number,
    required: true,
  },
  profitLoss: {
    type: Number,
    required: true,
  },
  riskReward: {
    type: Number,
    required: true,
  },
  totalAsset: {
    type: Number,
    required: true,
  },
  drawDown: {
    type: Number,
    required: true,
  },
  winLoss: {
    type: String,
    required: true,
  },
  status: {
    code: Number,
    label: {
      fa: String,
      en: String,
    },
    color: String,
    bg: String,
  },
  portfolioId: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model("Journal", journalSchema);
