const { Category } = require("../../../db/MySQL/models");
const { inspect } = require("../../utils");

const {
  categoryList: refinedCategoryList,
} = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const isMain = req.query.isMain ?? false;
  const defaultOption = {
    order: [["parentId", "ASC"]],
  };

  inspect(defaultOption);
  
  const { sortOptions } = res;

  defaultOption.order.push(sortOptions);

  inspect(defaultOption);
  
  if (isMain) {
    defaultOption.where = { main: true };
  }

  const categories = await Category.findAll(defaultOption);

  res.jsonData = refinedCategoryList(categories);
  next();
};
