const { category: refinedCategory } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  let uppedData = false;

  const {
    chainData: { parentCategory, category },
  } = res;

  const { name, parentId } = req.body;

  if (name && name !== category.name) category.name = uppedData = name;

  if (parentId && parentCategory.id !== category.parentId)
    category.parentId = uppedData = parentCategory.id;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const updateCategory = await category.save();

  res.jsonData = refinedCategory(updateCategory);
  next();
};
