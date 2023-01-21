const { Category } = require("../../../db/MySQL/models");

const {
  categoryList: refinedCategoryList,
} = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const isMain = req.query.isMain ?? false;
  const defaultOption = {
    order: [["parentId", "ASC"]],
  };

  if (isMain) {
    defaultOption.where = { main: true };
  }

  const category = await Category.findAll(defaultOption);

  res.jsonData = refinedCategoryList(category);
  next();
};
