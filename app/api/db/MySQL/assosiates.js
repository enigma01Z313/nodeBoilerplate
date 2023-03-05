module.exports = (db) => {
  const {
    User,
    Role,
    UserMeta,
    Book,
    Tag,
    Category,
    Book_tag,
    Book_category,
    Author,
    BookAuthor,
    Off_price,
    File,
    Wallet,
    Card,
    Comment,
  } = db;

  User.belongsTo(Role, { foreignKey: "role_id" });

  User.hasMany(Card, { foreignKey: "wallet_id" });
  Card.belongsTo(User, { foreignKey: "wallet_id" });

  User.hasOne(Wallet, { foreignKey: "ownerId" });
  Wallet.belongsTo(User, { foreignKey: "ownerId" });

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

  Book.belongsTo(User, { foreignKey: "publisherId", as: "publisher" });
  User.hasMany(Book, { foreignKey: "publisherId" });

  Off_price.belongsTo(Book, { foreignKey: "book_id" });
  Book.hasOne(Off_price, { foreignKey: "book_id" });

  File.belongsTo(Book, { foreignKey: "book_id" });
  Book.hasMany(File, { foreignKey: "book_id" });

  User.hasMany(Comment, { foreignKey: "userId" });
  Comment.belongsTo(User, { foreignKey: "userId" });

  Book.hasMany(Comment, { foreignKey: "bookId" });
  Comment.belongsTo(Book, { foreignKey: "bookId" });

  Comment.hasMany(Comment, {
    foreignKey: "repliesTo",
  });

  return db;
};
