const getUser = require("./getUser");

module.exports = async (req, res, next) => {
  const { authorization } = req?.headers;
  res.loggedIn = false;

  if (authorization) {
    const user = await getUser(authorization);
    res.authenticatedUser = user;
    res.loggedIn = true;
  }

  next();
};
