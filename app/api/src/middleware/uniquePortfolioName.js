const { Portfolio } = require("../../db/mongoDb/");
const fError = require("../utils/fError");

const uniquePortfolioName = async (req, res, next) => {
  const { name } = req.body;
  const {
    authenticatedUser: { uuid: userId },
  } = res;

  const portfolio = await Portfolio.findOne({ name, userId });

  if (portfolio)
    return next(
      fError(400, `duplicate portfolio name`, `نام پورتفولیو تکراری میباشد`)
    );

  return next();
};

module.exports = uniquePortfolioName;
