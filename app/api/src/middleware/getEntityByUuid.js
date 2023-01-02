const { Op } = require("sequelize");

const Models = require("../../db/MySQL/models");
const refineData = require("../../db/MySQL/refines");
const { fError } = require("../utils");

module.exports = (info) => {
  return async (req, res, next) => {
    const model = info.model;
    const includes = info.includes;
    const fields = info.fields;

    if (!fields) return next();

    const whichField = [];
    let returnFlag = false;

    for (const field of fields) {
      if (!req.body[field]) {
        returnFlag = true;
        break;
      }
      whichField.push({
        uuid: [req.params[field] ?? req.body[field]],
      });
    }

    if (returnFlag) return next();

    const whereOptions = {
      where: {
        [Op.or]: whichField,
      },
      include: includes,
    };

    const item = await Models[model].findOne(whereOptions);
    console.log(item);
    if (!item)
      return next(fError(404, " This id is not found", "این شناسه پیدا نشد"));

    const name = model[0].toLowerCase() + model.substring(1);

    res.chainData[name] = item;
    res.chainData[`refined${name}`] = refineData[model.toLowerCase()]?.(item);

    next();
  };
};
