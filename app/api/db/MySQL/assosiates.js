module.exports = (db) => {
  const {
    User,
    Role,
    UserMeta,
    Book,
    Tag,
    Book_tag,
    Category,
    Book_category,
    Author,
    BookAuthor,
  } = db;

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

  Book.belongsToMany(Category, {
    through: Book_category,
    as: "categories",
    foreignKey: "book_id",
  });

  Category.belongsToMany(Book, {
    through: Book_category,
    as: "books",
    foreignKey: "category_id",
  });

  Category.hasMany(Category, {
    foreignKey: "parentId",
  });

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
