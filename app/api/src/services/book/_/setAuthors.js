const { BookAuthor } = require("../../../../db/MySQL/models");

const getAuthorTypeCode = require("./getAuthorTypeCode");

module.exports = (bookId, authors, bodyAuthors, main) =>
  new Promise(async (res, rej) => {
    bookAuthorsPackage = [];

    let counter = 0;
    for (const authorType in bodyAuthors) {
      const authorTypeCode = getAuthorTypeCode(authorType);
      const thisTypeAuthorsUuids = bodyAuthors[authorType];

      for (const thisTypeAuthorsUuid of thisTypeAuthorsUuids) {
        const authorId = authors.find(
          ({ dataValues: item }) => item.uuid === thisTypeAuthorsUuid
        ).dataValues.id;

        const isMain =
          (!main && counter === 0 && true) ||
          (main && main === thisTypeAuthorsUuid && true) ||
          false;

        bookAuthorsPackage.push({
          book_id: bookId,
          author_id: authorId,
          authorType: authorTypeCode,
          isMain,
        });

        counter++;
      }
    }

    await BookAuthor.bulkCreate(bookAuthorsPackage);
    res();
  });
