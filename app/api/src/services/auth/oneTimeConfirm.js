const hash = require("../../utils/hash");
const fError = require("../../utils/fError");
const createJWT = require("../../utils/createJWT");
const { oneTimeLoginTime } = require("../../../../../config/oneTimeLoginTime");
const statusList = require("../../../db/staticDb/status");

module.exports = async (req, res, next) => {
  const { user } = res;
  const { confirmCode } = req.body;
  const { accessToken, refreshToken } = createJWT(user);
  const curTime = new Date().getTime();

  if (
    hash(confirmCode) !== user.confirmCode ||
    curTime - user.updatedAt.getTime() >= oneTimeLoginTime * 100000
  ) {
    const cookieHeader = req.cookies;
    const failedAttempt = cookieHeader?.failedAttempt ?? 0;
    res.cookie("failedAttempt", +failedAttempt + 1, {
      maxAge: 1500000,
      httpOnly: true,
    });

    return next(
      fError(
        401,
        "Authentication Error",
        "رمز یک بار مصرف نامعتبر/اشتباه میباشد"
      )
    );
  }

  const updatedUser = await user.update({
    accessToken,
    refreshToken,
    oneTimeLogin: null,
  });

  const userData = await updatedUser.myJson();

  res.jsonData = {
    accessToken,
    refreshToken,
    user: userData,
    meta: { ...statusList },
  };
  next();
};
