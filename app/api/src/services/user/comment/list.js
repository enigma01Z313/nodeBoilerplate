const { Op } = require("sequelize");
const { commentList } = require("../../../../db/MySQL/refines");
const { Book } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    chainData: { user },
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
        name: { [Op.like]: `%${search}%` },
      },
    };
  }

  const comments = await user.getComments({
    order: sortOptions,
    include: [
      {
        model: Book,
        ...searchOption,
      },
    ],
    limit,
    offset,
  });

  const totalComments = await user.getComments({
    include: [
      {
        model: Book,
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
