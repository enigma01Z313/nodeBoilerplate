const { commentList } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { user },
  } = res;

  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  const { sortOptions } = res;

  const comments = await user.getComments({
    paginationedOptions,
    order: sortOptions,
  });

  const totalComments = await user.getComments(defaultOptions);

  const responseBody = {
    data: commentList(comments),
    total: totalComments && totalComments.length,
  };

  res.jsonData = responseBody;
  next();
};
