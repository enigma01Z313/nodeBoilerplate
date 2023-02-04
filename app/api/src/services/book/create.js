module.exports = (req, res, next) => {
  const { name, content, publishedYear, price, offPrice, image, publisher } =
    req.body;
  const {
    chainData: { tags, categories, authors },
  } = res;


  // console.log(name);
  // console.log(content);
  // console.log(res.chainData);

  return res.end("111111111");
};
