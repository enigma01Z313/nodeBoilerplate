const journalFilter = (req, res, next) => {
  const { sortOptoins } = res;
  const { status, limit, page } = req.query;
  const portfolioId = res.portfolioRes?._id;

  //default settings
  const defaultConditions = portfolioId ? { portfolioId } : {};
  const limitOptions = { limit: 10, skip: 0, sort: sortOptoins };

  //conidtion options
  if (status) defaultConditions["status.code"] = status;

  //pagination options
  if (limit) limitOptions.limit = limit;
  if (page)
    limitOptions.skip = page === 1 ? 0 : (page - 1) * limitOptions.limit;

  res.defaultOptions = [defaultConditions, {}];
  res.pagedOptions = [defaultConditions, {}, limitOptions];
  next();
};

module.exports = journalFilter;
