module.exports = (db) => {
  const { User, Role, UserMeta, Book, Tag, Book_tag } = db;

  User.belongsTo(Role, { foreignKey: "role_id" });

  User.hasMany(UserMeta, { foreignKey: "userId" });

  UserMeta.belongsTo(User, { foreignKey: "userId" });

  Book.belongsToMany(Tag, {
    through: Book_tag,
    as: "tags",
    foreignKey: "book_id",
  });

  Tag.belongsToMany(Book, {
    through: Book_tag,
    as: "books",
    foreignKey: "tag_id",
  });

  // Book.hasMany(Book_tag);

  // Book_tag.belongsTo(Book);

  // Tag.hasMany(Book_tag);

  // Book_tag.belongsTo(Tag);

  return db;
};
