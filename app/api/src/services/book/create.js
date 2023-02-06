const {
  Book,
  Off_price,
  BookAuthor,
  File,
} = require("../../../db/MySQL/models");

const setOffPrice = (bookId, offPrice) =>
  new Promise(async (res, rej) => {
    if (offPrice && bookId) {
      await Off_price.create({
        ...offPrice,
        book_id: bookId,
      });
      res();
    } else rej();
  });

const getAuthorTypeCode = (authorKey) => {
  const authorType = require("../../../db/staticDb")("authorTypes")();
  const { code } = authorType.find(({ key }) => key === authorKey);
  return code;
};

const setAuthors = (bookId, authors, bodyAuthors) =>
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

const getfileTypeCode = (fileKey) => {
  const fileType = require("../../../db/staticDb")("fileTypes")();
  const { code } = fileType.find(({ key }) => key === fileKey);
  return code;
};

const setFiles = (bookId, files, bodyFiles) =>
  new Promise(async (res, rej) => {
    let sampleFilesUuis = [
      bodyFiles?.epub?.sample?.file,
      bodyFiles?.pdf?.sample?.file,
      bodyFiles?.sound?.sample?.file,
    ];
    sampleFilesUuis = sampleFilesUuis.filter((item) => item);

    bookFilesPackage = [];

    for (const file of files) {
      file.book_id = bookId;
      file.hasOwner = true;
      if (sampleFilesUuis.includes(file.dataValues.uuid)) file.isSample = true;

      // await file.save();
      console.log(file);
    }
    // for (const bodyFile in bodyFiles) {
    //   const fileTypeCode = getfileTypeCode(bodyFile);
    // const mainUuid = bodyFiles[bodyFile].main.file;
    // const sampleUuid = bodyFiles[bodyFile].sample.file;

    // const mainFileId = files.find(
    //   ({ dataValues: item }) => item.uuid === mainUuid
    // ).dataValues.id;
    // const sampleFileId = files.find(
    //   ({ dataValues: item }) => item.uuid === sampleUuid
    // ).dataValues.id;

    // console.log(mainFileId);
    // console.log(sampleFileId);
    // }
    res();
  });

module.exports = async (req, res, next) => {
  const { name, content, publishedYear, price, offPrice, image } = req.body;
  const {
    chainData: { tags, categories, authors, publisher, files },
  } = res;

  // const book = await Book.create({
  //   name,
  //   publishedYear,
  //   content,
  //   price,
  //   image,
  //   publisherId: publisher.id,
  // });

  // await book.setTags(tags);
  // await book.setCategories(categories);
  // await setOffPrice(book.id, offPrice);
  // await setAuthors(book.id, authors, req.body.authors);
  // await setFiles(book.id, files, req.body.files)
  await setFiles(12, files, req.body.files);

  // res.chainData.createdUuid = book.uuid;

  // console.log(files);
  return res.end("111111111");
  next();
};
