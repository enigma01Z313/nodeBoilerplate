const { BookAuthor } = require("../../../../db/MySQL/models");

const getAuthorTypeCode = require("./getAuthorTypeCode");

module.exports = (bookId, authors, bodyAuthors) =>
  new Promise(async (res, rej) => {
    bookAuthorsPackage = [];

    for (const authorType in bodyAuthors) {
      const authorTypeCode = getAuthorTypeCode(authorType);
      const thisTypeAuthorsUuids = bodyAuthors[authorType];

      for (const thisTypeAuthorsUuid of thisTypeAuthorsUuids) {
        const authorId = authors.find(
          ({ dataValues: item }) => item.uuid === thisTypeAuthorsUuid
        ).dataValues.id;

        bookAuthorsPackage.push({
          book_id: bookId,
          author_id: authorId,
          authorType: authorTypeCode,
        });
      }
    }

    await BookAuthor.bulkCreate(bookAuthorsPackage);
    res();
  });
