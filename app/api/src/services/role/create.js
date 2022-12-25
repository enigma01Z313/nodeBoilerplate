const { Role } = require("../../../db/mysql/models");

module.exports = async (req, res, next) => {
  const { name, permissions } = req.body;
  const newRole = await Role.create({
    name,
    permissions: JSON.stringify(permissions),
  });

  res.statusCode = 201;
  res.jsonData = newRole;
  next();
};
