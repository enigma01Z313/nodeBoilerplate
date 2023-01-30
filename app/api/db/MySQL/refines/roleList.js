const refinedData = require("./role.js");

module.exports = (items) =>
  items.map(({ dataValues: data }) => refinedData(data));
