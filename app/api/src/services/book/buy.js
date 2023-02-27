module.exports = (req, res, next) => {
  const {
    authenticatedUser: user,
    chainData: {
      refinedbook: { price },
      book,
    },
  } = res;
  const { from } = req.body;

  console.log(from, user.id, book.id, price);

  return res.end("haaaa");
};
