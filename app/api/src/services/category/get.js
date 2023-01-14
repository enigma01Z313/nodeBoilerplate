const { Category, Book } = require("../../../db/MySQL/models");
const { category: refineCategory } = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const category = await Category.findOne({
    where: { uuid },
    include: [
      {
        model: Category,
      },
    ],
  });

  res.chainData.category = category;
  res.jsonData = refineCategory(category);
  next();
};
