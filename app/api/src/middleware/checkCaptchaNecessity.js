const checkCaptchaNecessity = (req, res, next) => {
  const { skipCaptcha } = req.body;

  const cookieHeader = req.cookies;
  const failedAttempt = cookieHeader?.failedAttempt ?? 0;

  res.shouldSkip = +failedAttempt === 0 ? true : false;

  res.shouldSkip = skipCaptcha ? true : false;

  next();
};

module.exports = checkCaptchaNecessity;
