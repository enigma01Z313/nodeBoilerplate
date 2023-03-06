const { comment: refinedComment } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { status } = req.body;

  let uppedData = false;

  const {
    chainData: { comment },
  } = res;

  if (status && status !== comment.status) comment.status = uppedData = status;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const updatedComment = await comment.save();

  res.jsonData = refinedComment(updatedComment);
  next();
};
