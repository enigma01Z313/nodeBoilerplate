const { Op } = require("sequelize");
const { Comment, User, Book } = require("../../../db/MySQL/models");
const { commentList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    dbOptions: {
      defaultOptions,
      paginationedOptions: { limit, offest },
    },
    sortOptions,
  } = res;

  let searchOption;

  if (search) {
    searchOption = {
      where: {
        [Op.or]: [
          { "$book.name$": { [Op.like]: `%${search}%` } },
          { "$user.first_name$": { [Op.like]: `%${search}%` } },
          { "$user.last_name$": { [Op.like]: `%${search}%` } },
        ],
      },
    };
  }

  const comments = await Comment.findAll({
    order: sortOptions,
    include: [{ model: User }, { model: Book }],
    ...searchOption,
    limit,
    offest,
  });

  const commentsCount = await Comment.findAll(defaultOptions);

  responseBody = {
    data: commentList(comments),
    total: commentsCount.length,
  };

  res.jsonData = responseBody;
  next();
};
