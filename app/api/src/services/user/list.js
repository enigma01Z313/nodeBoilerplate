const { User } = require("../../../db/MySQL/models");

module.exports = async (req, res, next) => {

  const defaultOption = {
    order: [["createdAt", "DESC"]],
  };

  const user = await User.findAll(defaultOption);

  
  res.jsonData = user;
  next();
};
