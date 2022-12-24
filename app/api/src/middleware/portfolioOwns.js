const { Op } = require("sequelize");

const watchilstOwns = (req, res, next) => {
  const {
    authenticatedUser: { id: userId },
  } = res;

  res.dbOptions.defaultOptions.where[Op.and].push({ owner: userId });
  res.dbOptions.paginationedOptions.where[Op.and].push({ owner: userId });

  next();
};

module.exports = watchilstOwns;
