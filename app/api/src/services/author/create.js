const { Author } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const {
    firstName,
    lastName,
    coutnry,
    birthDate,
    deathDate,
    content,
    status,
  } = req.body;

  const newAuthor = await Author.create({
    firstName,
    lastName,
    coutnry,
    birthDate,
    deathDate,
    content,
    status,
  });

  res.jsonData = newAuthor;
  next();
};
