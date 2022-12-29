const { User } = require("../../../db/MySQL/models");
const fError = require("../../utils/fError");
const setOnetimePassword = require("../../utils/logic/setOnetimePassword");

module.exports = async (req, res, next) => {
  const { phone } = req.body;

  const user = await User.findOne({
    where: { phone },
  });
  if (!user) return next(fError(404, "Not Found", "شماره تماس اشتباه میباشد"));

  res.jsonData = await setOnetimePassword(user);
  next();
};
