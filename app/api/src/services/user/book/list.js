module.exports = (req, res, next) => {
  const { authenticatedUser } = res;

  console.log(authenticatedUser);
};
