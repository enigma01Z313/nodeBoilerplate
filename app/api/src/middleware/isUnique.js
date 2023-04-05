const Models = require("../../db/MySQL/models");
const fError = require("../utils/fError");
const isTheSame = (uuid, item) => (uuid && uuid === item.uuid ? true : false);
const isUnique = (model, modelFa, param, paramFa) => async (req, res, next) => {
  const keyParam = req.body[param];
  const { authenticatedUser, jsonData: userData, theSameUser } = res;
  if (
    !keyParam ||
    authenticatedUser?.[param] === keyParam ||
    userData?.[param] === keyParam
  )
    return next();
  const item = await Models[model].findOne({ where: { [param]: keyParam } });
<<<<<<< HEAD

=======
>>>>>>> comment
  if (item && !isTheSame(req.params.uuid, item))
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
