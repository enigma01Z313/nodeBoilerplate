const { Category } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name, content, status } = req.body;

  const {
    chainData: { category: { id: parentId } = {} },
  } = res;

  const createCategory = {
    name,
    content,
    parentId,
    status,
  };

  const category = await Category.create(createCategory);

  res.jsonData = category;
  next();
};
