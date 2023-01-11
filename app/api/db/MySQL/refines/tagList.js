const { inspect } = require("../../../src/utils");

const refinedData = require("./tag.js");

module.exports = (items) => {
  const refinedItems = [];
  for (let item of items) {
    const { dataValues: data } = item;

    refinedItems.push(refinedData(data));
  }
  return refinedItems;
};
