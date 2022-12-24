const fError = require("../utils/fError");

const hasUserAccessTo = (model, modelFa) => async (req, res, next) => {
  const {
    authenticatedUser: { id: userId },
    jsonData: { owner: ownerId },
  } = res;

  if (userId !== ownerId)
    return next(
      fError(
        403,
        `Access denied: you dont have access to ${model} with id ${req.params.uuid}`,
        `عدم دسترسی به ${modelFa}`
      )
    );

  next();
};

module.exports = hasUserAccessTo;
