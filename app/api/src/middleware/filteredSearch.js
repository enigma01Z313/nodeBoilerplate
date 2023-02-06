const { inspect } = require("../utils");

module.exports = (data) => async (req, res, next) => {
  const {
    dbOptions: { defaultOptions, paginationedOptions },
  } = res;

  inspect(data);
  inspect("============================");
  inspect(defaultOptions);
  inspect("============================");
  inspect(paginationedOptions);
  inspect("============================");
  next();
};
