const { Op } = require("sequelize");
const {
  Tag,
  Category,
  Author,
  User,
  Book,
} = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    tags,
    categories,
    author,
    publishers,
    page: pageNum,
    limit: pageLimit,
  } = req.query;

  let defaultOptions = {};
  const include = [];
  let queryChunk;

  if (tags) {
    queryChunk = {
      model: Tag,
      as: "tags",
      attributes: ["id", "uuid"],
      through: { attributes: [] },
      where: { uuid: { [Op.or]: tags.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (categories) {
    queryChunk = {
      model: Category,
      as: "categories",
      attributes: ["id", "uuid", "parentId"],
      through: { attributes: [] },
      where: { uuid: { [Op.or]: categories.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (author) {
    queryChunk = {
      model: Author,
      as: "authors",
      attributes: ["id", "uuid"],
      through: { attributes: [] },
      where: { uuid: { [Op.or]: author.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (publishers) {
    queryChunk = {
      model: User,
      as: "publisher",
      attributes: ["id", "uuid"],
      where: { uuid: { [Op.or]: publishers.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  const limit = pageLimit ? +pageLimit : 10;
  const page = pageNum ? +pageNum : 1;
  const offset = (page - 1) * +limit;
  const pagedOptions = Object.assign({ limit, offset }, defaultOptions);

  console.log(defaultOptions);
  const books = await Book.findAll(defaultOptions);

  res.queryOptions = { defaultOptions, pagedOptions };
  return next();
};
