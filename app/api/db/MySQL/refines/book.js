const bookStatus = require("../../staticDb")("bookStatus");
const authorTypes = require("../../staticDb")("authorTypes");

/////////////////////////////////
//temp refinements
/////////////////////////////////
const refineBookTags = (tags) =>
  !tags
    ? undefined
    : tags.map(({ dataValues: tag }) => ({
        ...tag,
        id: tag.uuid,
        uuid: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }));

const refineBookCategories = (categories) =>
  !categories
    ? undefined
    : categories.map(({ dataValues: category }) => ({
        ...category,
        id: category.uuid,
        uuid: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      }));

const refineAuthor = ({ dataValues: author } = {}) =>
  !author
    ? undefined
    : {
        ...author,
        id: author.uuid,
        fullName: `${author.firstName} ${author.lastName}`,
        uuid: undefined,
        coutnry: undefined,
        birthDate: undefined,
        deathDate: undefined,
        content: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        bookAuthor: undefined,
      };

const refineBookAuthorities = (authors, isList) => {
  if (!authors) return undefined;
  let refinedAuthors;

  authors.sort((a, b) => a.bookAuthor.authorType - b.bookAuthor.authorType);

  if (isList) {
    refinedAuthors =
      authors.length === 1
        ? `${authors[0].firstName} ${authors[0].lastName}`
        : "جمعی از نویسندگان";
  } else {
    refinedAuthors = {};
    for (const author of authors) {
      const { code, label, key } = authorTypes(author.bookAuthor.authorType);
      if (!refinedAuthors[key]) refinedAuthors[key] = { label, list: [] };

      refinedAuthors[key].list.push(refineAuthor(author));
    }
  }

  return refinedAuthors;
};

const refinePublisher = ({ dataValues: publisher } = {}) =>
  !publisher
    ? undefined
    : {
        ...publisher,
        id: publisher.uuid,
        name: publisher.firstName,
        firstName: undefined,
        lastName: undefined,
        uuid: undefined,
        phone: undefined,
        email: undefined,
        password: undefined,
        confirmCode: undefined,
        roleId: undefined,
        ip: undefined,
        accessToken: undefined,
        refreshToken: undefined,
        status: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        role_id: undefined,
      };

const refinePrice = (price, offPrice) => {
  if (!offPrice) return { price };
  else {
    let offedPrice;
    const {
      dataValues: { type, amount },
    } = offPrice;

    if (type === 2) offedPrice = price - amount >= 0 ? price - amount : 0;
    else if (type === 1) offedPrice = ((100 - amount) * price) / 100;

    return {
      price: offedPrice,
      originalPrice: price,
      ofAmount: price - offedPrice,
    };
  }
};

const refineFileMeta = (fileMeta) =>
  !fileMeta ? { metaData: undefined } : JSON.parse(fileMeta);

const refineFileType = (fileName) => {
  if (!fileName) return { type: undefined };
  const fileArr = fileName.split(".");
  const extention = fileArr[fileArr.length - 1];
  if (["pdf", "epub"].includes(extention))
    return { type: "file", label: "فایل" };
  else if (["ogg", "mp3"].includes(extention))
    return { type: "sound", label: "فایل صوتی" };
};

const refineBookFiles = (files) =>
  !files
    ? undefined
    : files.map(({ dataValues: file }) => {
        // console.log(refineFileType(file.name));
        return {
          ...file,
          id: file.uuid,
          fileType: { ...refineFileType(file.name) },
          meta: { ...refineFileMeta(file.metaData) },
          metaData: undefined,
          id: undefined,
          path: undefined,
          book_id: undefined,
          hasOwner: undefined,
          createdAt: undefined,
          updatedAt: undefined,
        };
      });
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
module.exports = (data, isList = false) => {
  const item = data?.dataValues ?? data;

  return {
    ...item,
    id: item.uuid,
    status: bookStatus(item.status),
    files: refineBookFiles(item.files),
    file: refineBookFiles(item.files),
    tags: refineBookTags(item.tags),
    categories: refineBookCategories(item.categories),
    authors: refineBookAuthorities(item.authors, isList),
    publisher: refinePublisher(item.publisher),
    ...refinePrice(item.price, item.off_price),
    uuid: undefined,
    off_price: undefined,
    sitePercent: undefined,
    publisherId: undefined,
    bookAuthor: undefined,
    book_tag: undefined,
    book_category: undefined,
  };
};
