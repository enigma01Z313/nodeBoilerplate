const { Tag, Book } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;
  const tag = await Tag.findOne({
    where: { uuid },
    include: { model: Book, as: "books" },
  });

  res.jsonData = tag;

  next();
};
