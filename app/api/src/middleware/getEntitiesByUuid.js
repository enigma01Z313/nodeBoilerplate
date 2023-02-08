const Models = require("../../db/MySQL/models");

const extractUuidsFromObject = (obj) => {
  let uuids = [];
  for (const i in obj) {
    const theData = obj[i];
    if (typeof theData !== "object") uuids.push(theData);
    else if (Array.isArray(theData)) uuids.push(theData);
    else uuids.push(extractUuidsFromObject(theData));
  }
  uuids = uuids.flat();

  return uuids.filter((item) => typeof item === "string");
};

const extractUuids = (data) =>
  !data ? undefined : extractUuidsFromObject(data);

module.exports = (info) => {
  return async (req, res, next) => {
    try {
      const model = info.model;
      const field = info.field;
      const name = info.chainKey;
      const data = req.body[field];
      let uuids = Array.isArray(data) ? data : extractUuids(data);
      uuids = [...new Set(uuids)];

      if (!uuids) return next();

      const whereOption = { where: { uuid: uuids } };

      const items = await Models[model].findAll(whereOption);

      if (uuids && uuids.length !== items.length)
        return res
          .status(404)
          .end(`some uuid of field "${field}" doesn't exist`);

      res.chainData[name] = items;

      next();
    } catch (err) {
      const status = err.status ?? 500;
      return res.status(status).end(`ERROR: ${err.message}`);
    }
  };
};
