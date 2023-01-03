const { Category } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name } = req.body;

  const {
    chainData: { category: { id: parentId } = {} },
  } = res;

  const createCategory = {
    name,
    parentId,
  };

  const category = await Category.create(createCategory);

  res.jsonData = category;
  next();
};
