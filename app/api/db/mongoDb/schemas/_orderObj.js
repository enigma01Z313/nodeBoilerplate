module.exports = {
  coinId: {
    type: String,
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
  price: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
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
  transferFee: {
    type: Number,
    required: true,
    default: 0,
  },
  portfolioId: {
    type: String,
    required: true,
  },
  outPPU: Number,
  outDate: Date,
  outPrice: Number,
  tax: Number,
};
