const validatorF = require("./validatorFunction");

const validator = (validations) => {
  return (req, res, next) => {
    const validateRes = validatorF(req.body, validations);

    if (validateRes === false) return next();
    else return next(validateRes);
  };
};

module.exports = validator;
