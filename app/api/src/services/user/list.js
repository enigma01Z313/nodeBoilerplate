const { User } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {
  const user = await User.findAll();
  res.jsonData = user;
  next();
};
