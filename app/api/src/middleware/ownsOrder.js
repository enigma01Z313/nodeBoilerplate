const { Order, Portfolio } = require("../../db/mongoDb");
const fError = require("../utils/fError");

module.exports = async (req, res, next) => {
  const {
    authenticatedUser: { uuid: userId },
  } = res;

  const { uuid } = req.params;

  const targetOrder = await Order.findOne({ _id: uuid });

  if (!targetOrder) return next(fError(404, "Order not found", "موجود نیست"));

  const { portfolioId: targetPortfolio } = targetOrder;

  const portfolioAccessCheck = await Portfolio.findOne({
    _id: targetPortfolio,
    userId,
  });

  if (!portfolioAccessCheck)
    return next(
      fError(403, "Access denied", "عدم دسترسی به سفارش فراخوانی شده")
    );

  next();
};
