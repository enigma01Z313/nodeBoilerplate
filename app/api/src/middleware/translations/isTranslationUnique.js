const { Op } = require("sequelize");
const Models = require("../../../db/mysql/models");
const fError = require("../../utils/fError");

const isTranslationUnique = (model, modelFa) => async (req, res, next) => {
  const { setLang: lang } = res;
  const { id: mainItemId } = res[model];

  const item = await Models[`${model}Translation`].findOne({
    where: {
      [Op.and]: [{ lang }, { [`${model.toLowerCase()}Id`]: mainItemId }],
    },
  });

  if (item)
    return next(
      fError(
        400,
        `Duplicate entry: data of '${model}' with language ${lang} already exists`,
        `دیتا ${modelFa} با زبال ${lang} قبلا وارد شده است`
      )
    );

  return next();
};

module.exports = isTranslationUnique;
