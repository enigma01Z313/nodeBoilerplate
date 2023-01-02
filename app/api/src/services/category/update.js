module.exports = async (req, res, next) => {
  let uppedData = false;

  const {
    chainData: { category },
  } = res;

  const { name } = req.body;

  if (name && name !== category.name) category.name = uppedData = name;

  if (uppedData === false) {
    res.statusCode = 204;
    return next();
  }

  const updateCategory = await category.save();
  res.jsonData = updateCategory;
  next();
};
