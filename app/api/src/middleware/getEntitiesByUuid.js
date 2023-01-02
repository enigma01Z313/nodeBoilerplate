const Models = require("../../db/MySQL/models");

module.exports = (info) => {
  return async (req, res, next) => {
    try {
      const model = info.model;
      const field = info.field;
      const name = info.chainKey;
      const uuids = req.body[field];

      if (!uuids) return next();

      const whereOption = { where: { uuid: uuids } };

      const items = await Models[model].findAll(whereOption);

      if (uuids && uuids.length !== items.length)
        return res.status(404).end(`some of uuids doesn't exist`);

      res.chainData[name] = items;

      next();
    } catch (err) {
      const status = err.status ?? 500;
      return res.status(status).end(`ERROR: ${err.message}`);
    }
  };
};
