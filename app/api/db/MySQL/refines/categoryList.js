const { inspect } = require("../../../src/utils");

const refinedData = require("./category.js");

module.exports = (items) => {
  const refinedItems = [];
  const refined = [];
  for (let item of items) {
    const { dataValues: data } = item;

    if (!data.parentId) refinedItems.push(data);
    else {
      const parentIndex = refinedItems.findIndex(
        (item) => item.id === data.parentId
      );

      const parentItem = refinedItems[parentIndex];
      const parentChilds = parentItem.childs ?? [];
      parentChilds.push(refinedData(data));
      parentItem.childs = parentChilds;
    }
  }
  for (let refinedItem of refinedItems) {
    refined.push(refinedData(refinedItem));
  }

  return refined;
};
