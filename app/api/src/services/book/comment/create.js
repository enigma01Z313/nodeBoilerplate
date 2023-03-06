const { comment: commentRefiner } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { content, repliesTo } = req.body;

  const {
    chainData: { book },
  } = res;

  const defaultOption = {
    content,
    repliesTo,
  };
  const comment = await book.createComment(defaultOption);

  res.jsonData = commentRefiner(comment);
  next();
};
