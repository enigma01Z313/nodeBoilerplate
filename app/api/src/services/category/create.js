const { Category } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name, parentId } = req.body;
  const createCategory = {
    name,
    parentId,
  };

  const category = await Category.create(createCategory);
  res.jsonData = category;
  next();
};
