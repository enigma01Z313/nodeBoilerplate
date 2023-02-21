const status = require("../../staticDb")("defaultStatus");

module.exports = (item) => {
  const data = item?.dataValues ?? item;

  let refinData = {
    ...data,
    id: data.uuid,
    status: status(data.status),
    uuid: undefined,
    parentId: undefined,
  };

  if (data.categories) {
    if (data.categories.length !== 0) {
      refinData.childs = data.categories.map(({ dataValues: category }) => ({
        ...category,
        id: category.uuid,
        uuid: undefined,
        parentId: undefined,
      }));
    }
    refinData.categories = undefined;
  }

  return refinData;
};
