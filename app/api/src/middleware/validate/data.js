const fError = require("../../utils/fError");

const faErrors = [];
const enErrors = [];

// const doValidation = () => {};

const data = (validations) => {
  return (req, res, next) => {
    for (item of validations) {
      const tmpData = req.body[item.parameter];
      for ([i, v] of Object.entries(item.validations)) {
        //check for required validation
        if (
          i === "required" &&
          v.value === true &&
          (typeof tmpData === "undefined" || tmpData === "")
        )
          return next(fError(400, v.violations[0], v.violations[1]));

        //check for regex validation
        if (i === "regex" && v.value !== "" && !v.value.test(tmpData))
          return next(fError(400, v.violations[0], v.violations[1]));

        //check for length of parameter
        if (i === "length" && tmpData.length !== v.value)
          return next(fError(400, v.violations[0], v.violations[1]));

        if (i === "maximum" && tmpData.length >= v.value)
          return next(fError(400, v.violations[0], v.violations[1]));
          
        if (i === "minimum" && tmpData.length <= v.value)
          return next(fError(400, v.violations[0], v.violations[1]));

          // console.log(tmpData);
        // console.log(i, v);
      }
      // console.log("-------");
    }
    next();
  };
};

module.exports = data;
