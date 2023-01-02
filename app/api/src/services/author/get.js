const { Author, Book } = require("../../../db/MySQL/models");
const refineData = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const author = await Author.findOne({
    where: { uuid },
    include: [{ model: Book, as: "books" }],
  });

  if (!author)
    return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

  res.jsonData = refineData.author(author);
  next();
};
