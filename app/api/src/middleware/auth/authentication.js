require("dotenv").config();
const fError = require("../../utils/fError");

const getUser = require("./getUser");

const authentication = async (req, res, next) => {
  const { authorization } = req?.headers;

  if (!authorization)
    return next(fError(403, "Authorization not sent", "خطای اطلاعات ارسالی"));

  const user = await getUser(authorization);

  res.loggedIn = true;
  res.authenticatedUser = user;
  next();
};

module.exports = authentication;
