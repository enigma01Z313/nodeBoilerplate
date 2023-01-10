const statusList = require("./db").bookStatus;

const getStatus = (code) =>
  statusList.find((item) => item.code === parseInt(code));

module.exports = getStatus;
