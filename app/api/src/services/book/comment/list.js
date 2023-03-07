const { bookCommentList } = require("../../../../db/MySQL/refines");
const { User } = require("../../../../db/MySQL/models");
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
    include: [
      {
        model: User,
      },
    ],
  });

  const totalComments = await book.getComments(defaultOptions);

  const responseBody = {
    data: bookCommentList(comments),
    total: totalComments && totalComments.length,
  };

  res.jsonData = responseBody;
  next();
};
