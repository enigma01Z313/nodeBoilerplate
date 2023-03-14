const { Op } = require("sequelize");
const { commentList } = require("../../../../db/MySQL/refines");
const { Book } = require("../../../../db/MySQL/models");

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
    ],
  });

  const responseBody = {
    data: commentList(comments),
  };

  res.jsonData = responseBody;

  next();
};
