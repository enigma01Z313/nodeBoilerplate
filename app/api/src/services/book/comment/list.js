const { commentList } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { book },
  } = res;

  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  const { sortOptions } = res;

  const comments = await book.getComments({
    paginationedOptions,
    order: sortOptions,
  });

  const totalComments = await book.getComments(defaultOptions);

  const responseBody = {
    data: commentList(comments),
    total: totalComments && totalComments.length,
  };

  res.jsonData = responseBody;
  next();
};
