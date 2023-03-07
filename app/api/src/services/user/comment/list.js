const { Op } = require("sequelize");
const { userCommentList } = require("../../../../db/MySQL/refines");
const { Book } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    chainData: { user },
  } = res;

  const {
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
    data: userCommentList(comments),
    total: totalComments && totalComments.length,
  };

  res.jsonData = responseBody;

  next();
};
