const refinedData = require("./card");

module.exports = (data) => data.map((card) => refinedData(card));
