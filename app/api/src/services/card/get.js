const { Card } = require("../../../db/MySQL/models");
const { fError } = require("../../utils");
const { card: refineCard } = require("../../../db/MySQL/refines");
module.exports = async (req, res, next) => {
  const { uuid } = req.params;

  const card = await Card.findOne({ where: { uuid } });
  if (!card)
    return next(fError(404, "Card not found", "کارت مورد نظر وجود ندارد"));

  res.jsonData = refineCard(card);
  next();
};
