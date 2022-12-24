const statusList = require("./status").paymentStatus;

const getPaymentStatus = (code) =>
  statusList.find((item) => item.code === parseInt(code));

module.exports = getPaymentStatus;
