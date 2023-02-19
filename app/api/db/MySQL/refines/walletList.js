const refinedData = require("./wallet");

module.exports = (data) => data.map((wallet) => refinedData(wallet));
