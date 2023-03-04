const axios = require("axios");
const { merchantCode: merchant } = require("../../../../../config/shop");
const { fError } = require("../../utils");

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

  const result = await axios.post({
    method: "post",
    url: "https://gateway.zibal.ir/v1/verify",
    data: {
      merchant,
      trackId,
    },
  });

  console.log("result form gateway verify", result);

  const { status, amount, orderId: transactionId } = result;
};
