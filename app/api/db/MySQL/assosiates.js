module.exports = (db) => {
  const { User, Role, UserMeta } = db;

  User.belongsTo(Role, { foreignKey: "role_id" });

  User.hasMany(UserMeta, { foreignKey: "userId" });

  UserMeta.belongsTo(User, { foreignKey: "userId" });

  return db;
};
