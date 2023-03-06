const { Comment, User, Book } = require("../../../db/MySQL/models");
const { commentList } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  const comments = await Comment.findAll({
    include: [{ model: User }, { model: Book }],
    paginationedOptions,
  });

  const commentsCount = await Comment.findAll(defaultOptions);

  responseBody = {
    data: commentList(comments),
    total: commentsCount.length,
  };

  res.jsonData = responseBody;
  next();
};
