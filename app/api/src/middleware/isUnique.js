const Models = require("../../db/mysql/models");
const fError = require("../utils/fError");

const isUnique = (model, modelFa, param, paramFa) => async (req, res, next) => {
  const keyParam = req.body[param];
  const { authenticatedUser, jsonData: userData } = res;

  if (
    !keyParam ||
    authenticatedUser?.[param] === keyParam ||
    userData?.[param] === keyParam
  )
    return next();

  const item = await Models[model].findOne({ where: { [param]: keyParam } });

  if (item)
    return next(
      fError(
        400,
        `Duplicate entry: another '${model}' with ${param} '${keyParam}' exists`,
        `${paramFa} ${modelFa} تکراری میباشد`
      )
    );

  return next();
};

module.exports = isUnique;
