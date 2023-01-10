module.exports = (req, res, next) => {
  const {
    chainData: { similarityParams },
  } = res;

  console.log(similarityParams);

  return res.end("11111111111");
};
