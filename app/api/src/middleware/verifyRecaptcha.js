const axios = require("axios");
const fError = require("../utils/fError");
const { secretKey } = require("../../../../config/recaptcha");

const verifyRecaptcha = async (req, res, next) => {
  const shouldSkip = res.shouldSkip ?? false;

  // console.log("-------------------");
  // console.log("-------------------");
  // console.log("-------------------");
  // console.log(shouldSkip);
  // console.log("-------------------");
  // console.log("-------------------");
  // console.log("-------------------");

  if (shouldSkip) return next();

  const ip = req.connection.remoteAddress;
  const { captchaCode } = req.body;

  if (!captchaCode) {
    const cookieHeader = req.cookies;
    const failedAttempt = cookieHeader?.failedAttempt ?? 0;
    res.cookie("failedAttempt", +failedAttempt + 1, {
      maxAge: 15000,
      httpOnly: true,
    });

    return next(
      fError(
        400,
        `Paramter captchaCode not sent`,
        `پارامتر 'captchaCode' ارسال نشده`
      )
    );
  }

  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaCode}&remoteip=${ip}`;
  const verifyRes = await axios.post(verifyUrl);

  if (!verifyRes?.data?.success) {
    const cookieHeader = req.cookies;
    const failedAttempt = cookieHeader?.failedAttempt ?? 0;
    res.cookie("failedAttempt", +failedAttempt + 1, {
      maxAge: 15000,
      httpOnly: true,
    });

    next(fError(400, `Wrong captcha`, `کد کپچا اشتباه است`));
  }

  return next();
};

module.exports = verifyRecaptcha;
