module.exports = (db) => {
  const { User, Role } = db;

  User.belongsTo(Role, { foreignKey: "role_id" });

  return db;
};
