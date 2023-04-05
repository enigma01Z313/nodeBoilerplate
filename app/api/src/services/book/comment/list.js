const { Op } = require("sequelize");
const { commentList } = require("../../../../db/MySQL/refines");
const { Comment, User } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    chainData: { book },
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
    order: [["repliesTo", "ASC"], ...sortOptions],
    distinct: true,
    include: [
      {
        model: User,
        ...searchOption,
      },
      { model: Comment, as: "replies", include: [{ model: User }] },
    ],
  });

  const responseBody = {
    data: commentList(comments),
  };

  res.jsonData = responseBody;

  next();
};
