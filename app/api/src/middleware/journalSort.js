const journalSort = (req, res, next) => {
  const { sortCreatedAt, sortStatus } = req.query;
  const sortOptions = {};

  if (sortCreatedAt)
    if (sortCreatedAt === "1") sortOptions.createdAt = 1;
    else if (sortCreatedAt === "-1") sortOptions.createdAt = -1;

  if (sortStatus)
    if (sortStatus === "-1") sortOptions.winLoss = 1;
    else if (sortStatus === "1") sortOptions.winLoss = -1;

  res.sortOptoins = sortOptions;

  next();
};

module.exports = journalSort;
