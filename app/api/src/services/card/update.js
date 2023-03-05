const { card: refinedCard } = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { name, cardNumber, shebaNumber } = req.body;

  let uppedData = false;

  const {
    chainData: { card },
  } = res;

  if (name && name !== card.name) card.name = uppedData = name;

  if (cardNumber && cardNumber !== card.cardNumber)
    card.cardNumber = uppedData = cardNumber;

  if (shebaNumber && shebaNumber !== card.shebaNumber)
    card.shebaNumber = uppedData = shebaNumber;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const updatedCard = await card.save();

  res.jsonData = refinedCard(updatedCard);
  next();
};
