const { cardList } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  const {
    chainData: { user },
  } = res;

  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  const { sortOptions } = res;

  const cards = await user.getCards({
    paginationedOptions,
    order: sortOptions,
  });

  const totalCards = await user.getCards(defaultOptions);

  const responseBody = {
    data: cardList(cards),
    total: totalCards && totalCards.length,
  };

  res.jsonData = responseBody;
  next();
};
