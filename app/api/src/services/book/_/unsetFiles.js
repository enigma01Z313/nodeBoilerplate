const { File } = require("../../../../db/MySQL/models");

module.exports = (bookId) =>
  new Promise(async (res, rej) => {
    await File.update({ hasOwner: false }, { where: { book_id: bookId } });
  });
