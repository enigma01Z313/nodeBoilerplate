const { Off_price } = require("../../../../db/MySQL/models");

module.exports = (bookId, offPrice) =>
  new Promise(async (res, rej) => {
    if (bookId) {
      if (!offPrice) return res();
      const amount =
        offPrice.type === 1 && offPrice.amount >= 100 ? 100 : offPrice.amount;

      await Off_price.create({
        ...offPrice,
        type: offPrice.type,
        amount,
        book_id: bookId,
      });

      res();
    } else rej();
  });
