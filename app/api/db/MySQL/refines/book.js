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

const refineBookAuthorities = (authors) => {
  if (!authors) return undefined;
  const refinedAuthors = {};

  authors.sort((a, b) => a.bookAuthor.authorType - b.bookAuthor.authorType);

  for (const author of authors) {
    const { code, label, key } = authorTypes(author.bookAuthor.authorType);
    if (!refinedAuthors[key]) refinedAuthors[key] = { label, list: [] };

    refinedAuthors[key].list.push(refineAuthor(author));
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

const getSimilarityParams = (data) => {
  const similarityParams = {};
  let list;
  const { authors, tags, categories, publisher } = data;

  list = [];
  for (const author of authors) list.push(author.dataValues.uuid);
  similarityParams.authors = {
    model: "Author",
    weight: 1,
    list: list.join(","),
  };

  list = [];
  for (const tag of tags) list.push(tag.dataValues.uuid);
  similarityParams.tags = {
    model: "Tag",
    weight: 1,
    list: list.join(","),
  };

  list = [];
  for (const category of categories) list.push(category.dataValues.uuid);
  similarityParams.categories = {
    model: "Categories",
    weight: 1,
    list: list.join(","),
  };

  similarityParams.publisher = {
    model: "User",
    weight: 1,
    list: publisher.dataValues.uuid,
  };
  publisher;

  console.log(similarityParams);

  return { aa: 12 };
};
/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
module.exports = (data) => {
  const item = data?.dataValues ?? data;

  return {
    data: {
      ...item,
      id: item.uuid,
      status: bookStatus(item.status),
      tags: refineBookTags(item.tags),
      categories: refineBookCategories(item.categories),
      authors: refineBookAuthorities(item.authors),
      publisher: refinePublisher(item.publisher),
      uuid: undefined,
      sitePercent: undefined,
      publisherId: undefined,
    },
    similarityParams: getSimilarityParams(item),
  };
};
