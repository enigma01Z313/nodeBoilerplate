const { User } = require("../../../db/mysql/models");
const fError = require("../../utils/fError");
const setOnetimePassword = require("../../utils/logic/setOnetimePassword");

const oneTimeLogin = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: { email },
  });
  if (!user) return next(fError(404, "Not Found", "شماره تماس اشتباه میباشد"));

  res.jsonData = await setOnetimePassword(user);
  next();
};

module.exports = oneTimeLogin;
