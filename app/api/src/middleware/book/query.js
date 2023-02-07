const { Op } = require("sequelize");
const { inspect } = require("../../utils");
const {
  Tag,
  Category,
  Author,
  User,
  Off_price,
  Book,
} = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    page: pageNum,
    limit: pageLimit,
    s: search,
    tags,
    categories,
    authors,
    publishers,
  } = req.query;

  let queryChunk;
  const include = [{ model: Off_price }];
  let defaultOptions = { include };

  queryChunk = {
    model: Author,
    as: "authors",
    attributes: ["id", "uuid", "firstName", "lastName"],
    through: { attributes: ["authorType"] },
    where: !authors ? undefined : { uuid: { [Op.or]: authors.split(",") } },
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

  if (search) {
    defaultOptions.where = {
      name: {
        [Op.like]: `%${search}%`,
      },
    };
  }

  const limit = pageLimit ? +pageLimit : 10;
  const page = pageNum ? +pageNum : 1;
  const offset = (page - 1) * +limit;
  const pagedOptions = Object.assign({ limit, offset }, defaultOptions);

  res.queryOptions = { defaultOptions, pagedOptions };

  return next();
};
