const { Category, Book } = require("../../../db/MySQL/models");
const { category: refineCategory } = require("../../../db/MySQL/refines");

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

  res.jsonData = refineCategory(category);
  next();
};
