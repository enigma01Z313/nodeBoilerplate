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

const refineBookAuthorities = (authors) => {
  if (!authors) return undefined;
  const refinedAuthors = [];

  authors.sort((a, b) => a.bookAuthor.authorType - b.bookAuthor.authorType);

  for (const author of authors) {
    const { code, label, key } = authorTypes(author.bookAuthor.authorType);
    if (!refinedAuthors[key]) refinedAuthors[key] = { label, list: [] };

    console.log({ ...author.dataValues });

    refinedAuthors[key].list.push({ ...author.dataValues });
  }

  // console.log(refinedAuthors);

  return refinedAuthors;
};

/////////////////////////////////
/////////////////////////////////
/////////////////////////////////
module.exports = (data) => {
  const item = data?.dataValues ?? data;

  return {
    ...item,
    id: item.uuid,
    status: bookStatus(item.status),
    tags: refineBookTags(item.tags),
    categories: refineBookCategories(item.categories),
    authors: refineBookAuthorities(item.authors),
    uuid: undefined,
    sitePercent: undefined,
    publishedYear: undefined,
    content: undefined,
    publisherId: undefined,
  };
};
