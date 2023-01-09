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
      attributes: ["id", "uuid", "name"],
      through: { attributes: [] },
      where: { id: { [Op.or]: tags.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (categories) {
    queryChunk = {
      model: Category,
      as: "categories",
      attributes: ["id", "uuid", "name", "parentId"],
      through: { attributes: [] },
      where: { id: { [Op.or]: categories.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (author) {
    queryChunk = {
      model: Author,
      as: "authors",
      attributes: [
        "id",
        "uuid",
        "firstName",
        "lastName",
        "coutnry",
        "birthDate",
        "deathDate",
        "content",
      ],
      through: { attributes: [] },
      where: { id: { [Op.or]: author.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  if (publishers) {
    queryChunk = {
      model: User,
      as: "publisher",
      attributes: ["id", "uuid", "firstName", "imageId"],
      where: { id: { [Op.or]: publishers.split(",") } },
    };

    include.push(queryChunk);
    defaultOptions = { ...defaultOptions, include };
  }

  const limit = pageLimit ? +pageLimit : 10;
  const page = pageNum ? +pageNum : 1;
  const offset = (page - 1) * +limit;
  const pagedOptions = Object.assign({ limit, offset }, defaultOptions);

  res.queryOptions = { defaultOptions, pagedOptions };
  return next();
};
