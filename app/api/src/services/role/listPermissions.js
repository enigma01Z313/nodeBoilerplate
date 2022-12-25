const { Option } = require("../../../db/mysql/models");

module.exports = async (req, res, next) => {
  const permissions = await Option.findOne({ where: { key: "permissions" } });

  res.jsonData = JSON.parse(permissions.value);
  next();
};
