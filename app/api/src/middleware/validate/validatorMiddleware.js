const validateErrors = require("./validateErrors");

const validator = (validations) => {
  return (req, res, next) => {
    for (item of validations) {
      const tmpData = req.body[item.parameter];
      for ([i, v] of Object.entries(item.validations)) {
        const validateRes = validateErrors(i, v, tmpData, item.parameter);
        if (validateRes) return next(validateRes);
      }
    }
    next();
  };
};

module.exports = validator;
