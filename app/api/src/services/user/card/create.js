const { card: cardRefiner } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { name, cardNumber, shebaNumber } = req.body;

  const {
    chainData: { user },
  } = res;

  console.log(name, cardNumber, shebaNumber);

  const defaultOption = {
    name,
    cardNumber,
    shebaNumber,
  };
  const card = await user.createCard(defaultOption);

  res.jsonData = cardRefiner(card);
  next();
};
