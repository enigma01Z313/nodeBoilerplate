const {
  Book,
  Off_price,
  BookAuthor,
  File,
} = require("../../../db/MySQL/models");

const setOffPrice = require("./_/setOffPrice");
const setAuthors = require("./_/setAuthors");
const setFiles = require("./_/setFiles");

module.exports = async (req, res, next) => {
  const { name, content, publishedYear, price, offPrice, image } = req.body;
  const {
    chainData: { tags, categories, authors, publisher, files },
  } = res;

  const book = await Book.create({
    name,
    publishedYear,
    content,
    price,
    image,
    publisherId: publisher.id,
  });

  await book.setTags(tags);
  await book.setCategories(categories);
  await setOffPrice(book.id, offPrice);
  await setAuthors(book.id, authors, req.body.authors);
  await setFiles(book.id, files, req.body.files);

  res.chainData.createdUuid = book.uuid;
  next();
};
