const { inspect } = require("../../../src/utils");

module.exports = (items) => {
  const refinedItems = [];

  for (let item of items) {
    const { dataValues: data } = item;
    if (!data.parentId) refinedItems.push(data);
    else {
      const parentIndex = refinedItems.findIndex(
        (item) => item.id === data.parentId
      );
      const parentItem = refinedItems[parentIndex];
      const prentChilds = parentItem.childs ?? [];
      prentChilds.push(data);

      parentItem.childs = prentChilds;
    }
  }

  // inspect(refinedItems);
};
