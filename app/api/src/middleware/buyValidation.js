const multiparty = require("multiparty");

module.exports = (req, res, next) => {
  const form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    if (err) console.log(err);

    const { token, from } = fields;

    if (
      !token ||
      (Array.isArray(token) && token[0] === "") ||
      (!Array.isArray(token) && token === "")
    )
      return res.end("token not sent");

    if (
      !from ||
      (Array.isArray(from) && from[0] === "") ||
      (!Array.isArray(from) && from === "")
    )
      return res.end("from not sent");

    req.body = { token: token?.[0] ?? token, from: from[0]?.[0] ?? from };
    return next();
  });
};
