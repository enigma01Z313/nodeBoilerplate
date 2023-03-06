const refinedData = require("./comment");

module.exports = (data) => data.map((comment) => refinedData(comment));
