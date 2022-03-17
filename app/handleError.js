const handleError = (err, req, res, next) => {
  console.log("---------------------");
  console.log("main error handler");
  console.log("---------------------");
  // console.log(err);
  res.status(err.status ?? 500).json({
    error: {
      message: err.message,
      text: err.text
    },
  });
};

module.exports = handleError;
