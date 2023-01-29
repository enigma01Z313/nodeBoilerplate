module.exports = (req, res, next) => {
  const {
    name,
    content,
    publishedYear,
    price,
    offPrice,
    image,
    publisher,
    categories,
    tags,
    authors,
  } = req.body;

  console.log(name);
  console.log(content);

  return res.end("111111111");
};
