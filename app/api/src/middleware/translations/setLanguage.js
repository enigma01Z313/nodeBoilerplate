const setLanguage = (req, res, next) => {
  res.setLang = req.query.lang ?? "fa";
  next();
};

module.exports = setLanguage;
