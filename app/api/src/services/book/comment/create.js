const { comment: commentRefiner } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { authenticatedUser } = res;
  const { content } = req.body;

  const {
    chainData: { book, comment: { id: repliesTo } = {} },
  } = res;

  const defaultOption = {
    content,
    repliesTo,
  };

  const comment = await book.createComment(defaultOption);

  await comment.setUser(authenticatedUser.id);

  res.jsonData = commentRefiner(comment);

  next();
};
