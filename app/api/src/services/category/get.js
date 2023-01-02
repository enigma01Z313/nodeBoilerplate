const { Category, Book } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const category = await Category.findOne({
    where: { uuid },
    include: { model: Book, as: "books" },
  });

  res.jsonData = category;
  next();
};
