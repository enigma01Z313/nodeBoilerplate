const setOffPrice = require("./_/setOffPrice");
const setAuthors = require("./_/setAuthors");
const setFiles = require("./_/setFiles");

module.exports = async (req, res, next) => {
  let uppedData = false;

  const {
    name,
    content,
    publishedYear,
    publisherId,
    price,
    offPrice,
    image,
    main,
  } = req.body;
  const {
    chainData: { book, tags, categories, authors, publisher, files },
  } = res;

//   if (publisherId) {
//     publisherId = publisher?.id;
//   }

  if (name && name !== book.name) book.name = uppedData = name;

  if (content && content !== book.content) book.content = uppedData = content;

  if (publishedYear && publishedYear !== book.publishedYear)
    book.publishedYear = uppedData = publishedYear;

  if (price && price !== book.price) book.price = uppedData = price;

  if (image && image !== book.image) book.image = uppedData = image;

  if (offPrice && offPrice !== book.offPrice)
    book.offPrice = uppedData = offPrice;

//   if (publisherId && publisherId !== book.publisherId)
    // book.publisherId = uppedData = publisherId;

  if (main && main !== book.main) book.main = uppedData = main;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  await book.save();

  res.chainData.createdUuid = book.uuid;

  await book.setTags(tags);

  await book.setCategories(categories);

  await setOffPrice(book.id, offPrice);

  await setAuthors(book.id, authors, req.body.authors, main);

  await setFiles(book.id, files, req.body.files);

  next();
};
