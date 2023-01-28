const refineData = require("../../../db/MySQL/refines");

module.exports = async (req, res, next) => {
  let uppedData = false;
  const {
    firstName,
    lastName,
    coutnry,
    birthDate,
    deathDate,
    content,
    status,
  } = req.body;
  const { author } = res.chainData;

  if (firstName && firstName !== author.firstName)
    author.firstName = uppedData = firstName;

  if (lastName && lastName !== author.lastName)
    author.lastName = uppedData = lastName;

  if (coutnry && coutnry !== author.coutnry)
    author.coutnry = uppedData = coutnry;

  if (birthDate && birthDate !== author.birthDate)
    author.birthDate = uppedData = birthDate;

  if (deathDate && deathDate !== author.deathDate)
    author.deathDate = uppedData = deathDate;

  if (content && content !== author.content)
    author.content = uppedData = content;

  if (status && status !== author.status) author.status = uppedData = status;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const refiner = refineData.author;
  res.jsonData = refiner ? refiner(await author.save()) : await author.save();
  next();
};
