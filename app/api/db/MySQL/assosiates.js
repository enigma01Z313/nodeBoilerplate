module.exports = (db) => {
<<<<<<< HEAD
  const { User, Role, UserMeta, Book, Tag, Book_tag } = db;
=======
  const { User, Role, UserMeta, Book, Author, BookAuthor } = db;
>>>>>>> bookAuthor

  User.belongsTo(Role, { foreignKey: "role_id" });

  User.hasMany(UserMeta, { foreignKey: "userId" });

  UserMeta.belongsTo(User, { foreignKey: "userId" });

<<<<<<< HEAD
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
=======
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
>>>>>>> bookAuthor

  return db;
};
