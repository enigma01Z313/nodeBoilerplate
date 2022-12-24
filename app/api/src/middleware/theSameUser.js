const theSameUser = (req, res, next) => {
  const { authenticatedUser: user } = res;
  const { uuid: targetUser } = req.params;

  // console.log("-----------------------");
  // console.log("-----------------------");
  // console.log(user?.uuid);
  // console.log(targetUser);
  // console.log("-----------------------");
  // console.log("-----------------------");

  res.theSameUser =
    user?.uuid && targetUser && targetUser === user?.uuid ? true : false;

  next();
};

module.exports = theSameUser;
