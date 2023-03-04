const open = require("open");
const { Transaction } = require("../../../db/MySQL/models");
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
  const gatewayReuest = await zibalGateway.request({
    amount,
    callbackUrl: `${host}/payments`,
    orderId: transactionId,
    description: `خرید کتاب ${bookName}.`,
    mobile,
  });
  const { trackId, paymentUrl } = gatewayReuest;

  //////////////////////
  console.log(trackId, paymentUrl);
  open(paymentUrl, "_self");

  return res.end("در حال انتقال به درگاه");
};
