module.exports = async (req, res, next) => {
  const {
    chainData: { tag },
  } = res;

  res.jsonData = await tag.getBooks();
  next();
};
