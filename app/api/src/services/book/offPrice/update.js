const { Off_price } = require("../../../../db/MySQL/models");
const { offPrice: refineOffPrice } = require("../../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  let uppedData = false;

  const {
    chainData: { book },
  } = res;

  const offprice = await Off_price.findOne({ where: { book_id: book.id } });

  const { type, amount, startDate, endDate } = req.body;

  if (type && type !== offprice.type) offprice.type = uppedData = type;

  if (amount && amount !== offprice.amount)
    offprice.amount = uppedData = amount;

  if (startDate && startDate !== offprice.startDate)
    offprice.startDate = uppedData = startDate;

  if (endDate && endDate !== offprice.endDate)
    offprice.endDate = uppedData = endDate;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }
  const updatedOffprice = await offprice.save();

  res.jsonData = refineOffPrice(updatedOffprice);
  next();
};
