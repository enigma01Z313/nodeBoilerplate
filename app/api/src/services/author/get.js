const { Author } = require("../../../db/MySQL/models");
const refineData = require("../../../db/MySQL/refines");
const { fError } = require("../../utils");

module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const author = await Author.findOne({ where: { uuid } });

  if (!author)
    return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

  res.chainData.author = author;
  res.jsonData = refineData.author(author);
  next();
};
