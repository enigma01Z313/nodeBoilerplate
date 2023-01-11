const { Op } = require("sequelize");
const {
  Tag,
  Category,
  Author,
  User,
  Off_price,
} = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { page: pageNum, limit: pageLimit } = req.query;

  const tags = req.query.tags ?? res.chaindata?.similar?.tags;
  const categories = req.query.categories ?? res.chaindata?.similar?.categories;
  const authors = req.query.authors ?? res.chaindata?.similar?.authors;
  const publishers = req.query.publishers ?? res.chaindata?.similar?.publishers;

  let defaultOptions = {};
  const include = [];
  let queryChunk;

  queryChunk = {
    model: Off_price,
  };
  include.push(queryChunk);
  defaultOptions = { ...defaultOptions, include };

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

  if (authors) {
    queryChunk = {
      model: Author,
      as: "authors",
      attributes: ["id", "uuid"],
      through: { attributes: [] },
      where: { uuid: { [Op.or]: authors.split(",") } },
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

  console.log(defaultOptions);

  const limit = pageLimit ? +pageLimit : 10;
  const page = pageNum ? +pageNum : 1;
  const offset = (page - 1) * +limit;
  const pagedOptions = Object.assign({ limit, offset }, defaultOptions);

  res.queryOptions = { defaultOptions, pagedOptions };
  return next();
};
