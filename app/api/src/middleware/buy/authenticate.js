const getUser = require("../auth/getUser");

module.exports = async (req, res, next) => {
  const { token } = req.body;

  const user = await getUser(`Bearer ${token}`);

  res.loggedIn = true;
  res.authenticatedUser = user;
  next();
};
