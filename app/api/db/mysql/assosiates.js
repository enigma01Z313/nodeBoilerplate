module.exports = (db) => {
  const { User, Role } = db;

  User.toJson = () => {
    return { aa: 12 };
  };

  User.belongsTo(Role, { foreignKey: "role_id" });

  return db;
};
