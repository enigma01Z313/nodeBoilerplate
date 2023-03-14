const { User_book } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: {
      transaction: { userId: user_id, bookId: book_id, from },
    },
  } = res;
  console.log(res.chainData);
  const userBook = await User_book.create({ user_id, book_id });

  // return res.end("3333333333");
  return res.redirect(paymentUrl);
};
