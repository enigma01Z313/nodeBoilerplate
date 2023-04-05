const { Op } = require("sequelize");
const { commentList } = require("../../../../db/MySQL/refines");
const { Comment, Book } = require("../../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const { s: search } = req.query;

  const {
    chainData: { user },
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
    order: [["repliesTo", "ASC"], ...sortOptions],
    include: [
      {
        model: Book,
        ...searchOption,
      },
      { model: Comment, as: "replies", include: [{ model: Book }] },
    ],
  });

  const responseBody = {
    data: commentList(comments),
  };

  res.jsonData = responseBody;

  next();
};
