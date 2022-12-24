const { Op } = require("sequelize");

const watchilstOwns = (req, res, next) => {
  const {
    authenticatedUser: { id: userId, email },
  } = res;

  res.dbOptions.defaultOptions.where[Op.and].push({
    owner: userId,
    name: { [Op.ne]: email },
  });
  res.dbOptions.paginationedOptions.where[Op.and].push({
    owner: userId,
    name: { [Op.ne]: email },
  });

  next();
};

module.exports = watchilstOwns;
