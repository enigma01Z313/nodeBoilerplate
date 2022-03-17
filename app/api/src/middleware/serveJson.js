const serveJson = (req, res, next) => res.status(200).json(res.jsonData);

module.exports = serveJson;
