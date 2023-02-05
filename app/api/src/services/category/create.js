const { Category } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { name, content, status, image, icon, isMain: main } = req.body;

  const {
    chainData: { category: { id: parentId } = {} },
  } = res;

  const createCategory = {
    name,
    content,
    parentId,
    status,
    image,
    icon,
  };

  const category = await Category.create(createCategory);

  res.jsonData = category;
  next();
};
