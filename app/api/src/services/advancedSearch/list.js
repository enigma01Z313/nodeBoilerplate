const { Op } = require("sequelize");
const { Author, User, Off_price, Book } = require("../../../db/MySQL/models");
const { bookList: refiner } = require("../../../db/MySQL/refines");

const { inspect } = require("../../utils");

module.exports = async (req, res, next) => {
  const criteria = req.query.criteria ?? "book";
  const bookType = req.query.bookType ?? "all";
  const { s: search, limit, page } = req.query;

  if (!search) {
    res.jsonData = [];
    next();
  }

  const include = [
    { model: Off_price },
    { model: Author, as: "authors", required: true },
  ];
  let where = {};

  if (criteria === "all") {
    include.push({ model: User, as: "publisher", required: true });
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { "$authors.first_name$": { [Op.like]: `%${search}%` } },
      { "$publisher.first_name$": { [Op.like]: `%${search}%` } },
    ];
  } else if (criteria === "author") {
    const whereOptions = [
      { "$authors.first_name$": { [Op.like]: `%${search}%` } },
    ];
    if (bookType !== "all") whereOptions.push({ [bookType]: true });

    where[Op.and] = whereOptions;
  } else if (criteria === "publisher") {
    include.push({ model: User, as: "publisher", required: true });
    const whereOptions = [
      { "$publisher.first_name$": { [Op.like]: `%${search}%` } },
    ];
    if (bookType !== "all") whereOptions.push({ [bookType]: true });

    where[Op.and] = whereOptions;
  } else if (criteria === "book") {
    const whereOptions = [{ name: { [Op.like]: `%${search}%` } }];
    if (bookType !== "all") whereOptions.push({ [bookType]: true });

    where[Op.and] = whereOptions;
  }

  const defaultOptions = { include, where };
  const pagedOptions = { ...defaultOptions };
  if (limit && limit !== "undefined") pagedOptions.limit = parseInt(limit);
  if (page && limit !== "undefined") {
    const limits = limit ?? 10;
    const pageNum = page > 0 ? parseInt(page) - 1 : 0;

    pagedOptions.limit = parseInt(limits);
    pagedOptions.offset = pageNum * parseInt(limits);
  }

  const data = await Book.findAll(pagedOptions);
  const total = await Book.findAll(defaultOptions);

  res.jsonData = { data: refiner(data), total: total.length };

  next();
};
