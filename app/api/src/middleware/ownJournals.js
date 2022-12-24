const ownJournals = (req, res, next) => {
  const {
    authenticatedUser: { uuid: userId },
    defaultOptions,
    pagedOptions,
  } = res;

  defaultOptions[0] = { ...defaultOptions[0], owner: userId };
  pagedOptions[0] = { ...pagedOptions[0], owner: userId };

  next();
};

module.exports = ownJournals;
