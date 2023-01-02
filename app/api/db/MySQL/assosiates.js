module.exports = (db) => {
  const { User, Role, UserMeta, Book, Author, BookAuthor } = db;

  User.belongsTo(Role, { foreignKey: "role_id" });

  User.hasMany(UserMeta, { foreignKey: "userId" });

  UserMeta.belongsTo(User, { foreignKey: "userId" });

  // console.log("----------------");
  // console.log(Book);
  // console.log(Author);
  // console.log(BookAuthor);
  // console.log("----------------");
  Book.belongsToMany(Author, {
    through: BookAuthor,
    as: "authors",
    foreignKey: "book_id",
  });
  Author.belongsToMany(Book, {
    through: BookAuthor,
    as: "books",
    foreignKey: "author_id",
  });
  // Book.hasMany(BookAuthor, { foreignKey: "book_id" });
  // BookAuthor.belongsTo(Book, { foreignKey: "book_id" });
  // Author.hasMany(BookAuthor, { foreignKey: "author_id" });
  // BookAuthor.belongsTo(Author, { foreignKey: "author_id" });

  return db;
};
