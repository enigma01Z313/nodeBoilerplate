const { Role } = require("../../../db/models");

const addRole = async (req, res, next) => {
  const { name, permissions } = req.body;
  const newRole = await Role.create({
    name,
    permissions: JSON.stringify(permissions),
  });

  res.jsonData = newRole;
  next();
};

module.exports = addRole;
