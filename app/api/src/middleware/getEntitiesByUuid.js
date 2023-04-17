const Models = require("../../db/MySQL/models");

const flatObj = (obj, field) => {
  const arr = [];

  //  if (field === "files") {
  //   for (const i in obj) {
  //     arr.push(obj[i].main.file, obj[i].sample.file);
  //   }
  //  } else {
  for (const i in obj) {
    arr.push(...obj[i]);
  }
  //  }
  return arr;
};

module.exports = (info) => {
  return async (req, res, next) => {
    try {
      const model = info.model;
      const field = info.field;
      const name = info.chainKey;
      const flat = info?.flat ?? false;
      let uuids = req.body[field];

      if (!uuids) return next();

      if (flat) uuids = flatObj(uuids, field);

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
