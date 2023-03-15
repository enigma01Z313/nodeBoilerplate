const axios = require("axios");
const { merchantCode: merchant } = require("../../../../../config/shop");
const { fError } = require("../../utils");
const zibalGateway = require("../book/createGateway")();

module.exports = async (req, res, next) => {
  const { success, trackId, orderId } = req.query;
  if (!(success && trackId && orderId))
    return next(
      fError(
        400,
        "Data missing: either success, trackId, orderId missing",
        "اطلاعات ارسالی ناقص میباشد"
      )
    );

  const { status: verifyRes, orderId: transactionId } =
    await zibalGateway.verify({ trackId });

  if (verifyRes !== 1)
    return next(fError(400, "Payment is not finished", "خطای پرداخت"));

  res.chainData.transactionId = transactionId;
  next();
};
