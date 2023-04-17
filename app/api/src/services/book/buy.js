const { Transaction, User_book } = require("../../../db/MySQL/models");
const { host } = require("../../../../../config/general");
const zibalGateway = require("./createGateway")();

module.exports = async (req, res, next) => {
  const {
    authenticatedUser: { phone: mobile, id: userId },
    chainData: {
      refinedbook: { price },
      book: { id: bookId, name: bookName },
    },
  } = res;
  const { from } = req.body;

  //////////////////////
  //craete transaction
  const transaction = await Transaction.create({
    amount: price,
    userId,
    bookId,
    from,
    action: 1,
  });
  const { amount, uuid: transactionId } = transaction;

  //////////////////////
  //get payment link
  if (price !== 0) {
    const gatewayReuest = await zibalGateway.request({
      amount,
      callbackUrl: `${host}/api/payments`,
      orderId: transactionId,
      description: `خرید کتاب ${bookName}.`,
      mobile,
    });
    const { trackId, paymentUrl } = gatewayReuest;
    return res.redirect(paymentUrl);
  } else {
    await User_book.create(userId, bookId);

    return res.redirect(from);
  }
};
