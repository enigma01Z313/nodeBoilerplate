const statusList = require("./db").defaultStatus;

const getStatus = (code) =>
  statusList.find((item) => item.code === parseInt(code));

module.exports = getStatus;
