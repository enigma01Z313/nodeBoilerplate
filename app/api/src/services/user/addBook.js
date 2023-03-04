const { User_book } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    chainData: {
      transaction: { userId: user_id, bookId: book_id, from },
    },
  } = res;
  const userBook = await User_book.create({ user_id, book_id });

  console.log("add userBook", userBook);
  console.log(from);
  return res.end("mikhaym bargardim safhe book");
};
