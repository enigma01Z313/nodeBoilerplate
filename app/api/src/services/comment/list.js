const { Op } = require("sequelize");
const { Comment, User, Book } = require("../../../db/MySQL/models");
const {
  commentList,
  comment,
  commentfullList,
} = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { s: search, flat } = req.query;

  const { sortOptions } = res;

  let searchOption;
  let flatComments;

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
    order: [["repliesTo", "ASC"], ...sortOptions],
    distinct: true,
    include: [
      { model: User },
      { model: Book },
      {
        model: Comment,
        as: "replies",
        include: [{ model: User }, { model: Book }],
      },
    ],
    ...searchOption,
  });

  if (flat === "true") {
    flatComments = await Comment.findAll({
      order: [["repliesTo", "ASC"], ...sortOptions],
      distinct: true,
      include: [{ model: User }, { model: Book }],
      ...searchOption,
    });

    responseBody = {
      data: commentfullList(flatComments),
    };
  } else {
    responseBody = {
      data: commentList(comments),
    };
  }

  res.jsonData = responseBody;

  next();
};
