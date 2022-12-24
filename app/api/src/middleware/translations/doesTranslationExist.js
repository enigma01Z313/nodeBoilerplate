const { Op } = require("sequelize");
const Models = require("../../../db/mysql/models");
const fError = require("../../utils/fError");

const doesTranslationExist = (model, modelFa) => async (req, res, next) => {
  const { setLang: lang } = res;
  const { id: mainItemId } = res[model];

  const item = await Models[`${model}Translation`].findOne({
    where: {
      [Op.and]: [{ lang }, { [`${model.toLowerCase()}Id`]: mainItemId }],
    },
  });

  if (!item)
    return next(
      fError(
        400,
        `Does not exit: '${model}' with id: '${keyParam}' does not exist`,
        `${modelFa} با ${paramFa}  فراخوانی شده، وجود ندارد`
      )
    );

  res[`${model}Translation`] = item;
  return next();
};

module.exports = doesTranslationExist;
