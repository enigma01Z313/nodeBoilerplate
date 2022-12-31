require("dotenv").config();

const { User, Role } = require("../../../db/MySQL/models");
const fError = require("../../utils/fError");

const authentication = async (req, res, next) => {
  const { authorization } = req?.headers;

  if (!authorization)
    return next(fError(403, "Authorization not sent", "خطای اطلاعات ارسالی"));

  const user = await User.findOne({
    where: { accessToken: authorization.split(" ")[1] },
    // include: Role,
  });

  if (!user)
    return next(fError(401, "Token not valid", "توکن نا معتبر میباشد"));

  res.authenticatedUser = user;
  next();
};

module.exports = authentication;
