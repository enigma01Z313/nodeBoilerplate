module.exports = async (req, res, next) => {
  const {
    chainData: { category },
  } = res;

  res.jsonData = await category.getBooks();
  next();
};
