const { Category } = require("../../../db/MySQL/models");
const { categoryList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const category = await Category.findAll({
    order: [["parentId", "ASC"]],
  });

  res.jsonData = categoryList(category);
  next();
};
