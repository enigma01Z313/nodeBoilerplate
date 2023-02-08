const refinedData = require("./author");

module.exports = (data) => data.map((author) => refinedData(author));
