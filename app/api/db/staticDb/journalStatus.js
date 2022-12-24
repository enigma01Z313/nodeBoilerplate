const statusList = require("./status").journalStatus;

const getJournalStatus = (code = 1) =>
  statusList.find((item) => item.code === parseInt(code));

module.exports = getJournalStatus;
