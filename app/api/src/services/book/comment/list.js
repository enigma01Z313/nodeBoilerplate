const { Op } = require("sequelize");
const { commentList } = require("../../../../db/MySQL/refines");
const { User } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    chainData: { book },
    dbOptions: {
      defaultOptions,
      paginationedOptions: { limit, offset },
    },
    sortOptions,
  } = res;

  let searchOption;

  if (search) {
    searchOption = {
      where: {
        [Op.or]: {
          firstName: { [Op.like]: `%${search}%` },
          lastName: { [Op.like]: `%${search}%` },
        },
      },
    };
  }

  const comments = await book.getComments({
    order: sortOptions,
    include: [
      {
        model: User,
        ...searchOption,
      },
    ],
    limit,
    offset,
  });

  const totalComments = await book.getComments({
    include: [
      {
        model: User,
        ...searchOption,
      },
    ],
  });

  const responseBody = {
    data: commentList(comments),
    total: totalComments && totalComments.length,
  };

  res.jsonData = responseBody;

  next();
};
