const Zibal = require("zibal");
const { Transaction } = require("../../../db/MySQL/models");
const { merchantCode: merchant } = require("../../../../../config/shop");
const { host } = require("../../../../../config/general");

console.log(Zibal.init);

module.exports = async (req, res, next) => {
  const {
    authenticatedUser: user,
    chainData: {
      refinedbook: { price },
      book,
    },
  } = res;
  const { from } = req.body;

  const transaction = await Transaction.create({
    amount: price,
    userId: user.id,
    bookId: book.id,
    action: 1,
  });

  const { uuid: transactionId } = transaction;

  // Zibal.init({
  //   merchant,
  //   callbackUrl: `${host}/payment?transaction=${transactionId}`,
  //   logLevel: 2,
  // });
  // const gatewayResult = await Zibal.request(1500);
  // console.log(gatewayResult);

  return res.end("haaaa");
};
