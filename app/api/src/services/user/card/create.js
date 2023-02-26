const { card: cardRefiner } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const { name, card_number, sheba_number } = req.body;

  const {
    chainData: { user },
  } = res;

  const defaultOption = {
    name,
    card_number,
    sheba_number,
  };
  const card = await user.createCard(defaultOption);

  res.jsonData = cardRefiner(card);
  next();
};
