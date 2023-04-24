const setOffPrice = require("./_/setOffPrice");
const setAuthors = require("./_/setAuthors");
const setFiles = require("./_/setFiles");

module.exports = async (req, res, next) => {
  let uppedData = false;

  const {
    name,
    content,
    publishedYear,
    price,
    offPrice,
    image,
    main,
    status,
    sound,
    tags: tagsBody,
    text,
  } = req.body;

  const {
    chainData: { book, tags, categories, authors, publisher, files },
  } = res;

  if (name && name !== book.name) book.name = uppedData = name;

  if (content && content !== book.content) book.content = uppedData = content;

  if (publishedYear && publishedYear !== book.publishedYear)
    book.publishedYear = uppedData = publishedYear;

  if (price && price !== book.price) book.price = uppedData = price;

  if (image && image !== book.image) book.image = uppedData = image;

  if (main && main !== book.main) book.main = uppedData = main;

  if (sound && sound !== book.sound) book.sound = uppedData = sound;

  if (text && text !== book.text) book.text = uppedData = text;

  if (status && status !== book.status) book.status = uppedData = status;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const updatedBook = await book.save();

  res.chainData.createdUuid = updatedBook.uuid;

  await book.setCategories(categories);

  await setOffPrice(book.id, offPrice);

  await setAuthors(book.id, authors, req.body.authors, main);

  await setFiles(book.id, files, req.body.files);

  next();
};
