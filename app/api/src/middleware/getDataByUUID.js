const Models = require("../../db/MySQL/models");
const fError = require("../utils/fError");
const { Op } = require("sequelize");
const refineData = require("../../db/MySQL/refines");

const createIncludeArray = (str) => {
  if (!str) return { include: [] };

  return {
    include: str.split(",").map((item) => Models[item]),
  };
};

const getDataByUUID =
  (model, modelFa, includeModels, translatable = false) =>
  async (req, res, next) => {
    const { uuid } = req.params;
    const { setLang } = res;

    const andCOnditions = [{ uuid }];

    if (translatable)
      andCOnditions.push({ [`$${model}Translations.lang$`]: setLang });

    const item = await Models[model].findOne({
      where: {
        [Op.and]: andCOnditions,
      },
      ...createIncludeArray(includeModels),
      subQuery: false,
    });

    if (!item)
      return next(
        fError(
          404,
          `Not found: '${model}' with id '${uuid}' does not exist`,
          `یافت نشد: ${modelFa} با ${uuid} وجود ندارد`
        )
      );

    const refinedFunction = refineData[model.toLowerCase()];
    res.jsonData = refinedFunction ? refinedFunction(item) : item;
    next();
  };

module.exports = getDataByUUID;
