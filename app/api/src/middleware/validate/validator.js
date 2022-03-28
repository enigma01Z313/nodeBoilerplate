const fError = require("../../utils/fError");

const validator = (validations) => {
  return (req, res, next) => {
    console.log(validations[1]);
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
        else if (i === "regex" && v.value !== "" && !v.value.test(tmpData))
          return next(fError(400, v.violations[0], v.violations[1]));
        else if (i === "length" && tmpData.length !== v.value)
          return next(fError(400, v.violations[0], v.violations[1]));
        else if (i === "maximum" && tmpData.length >= v.value)
          return next(fError(400, v.violations[0], v.violations[1]));
        else if (i === "minimum" && tmpData.length <= v.value)
          return next(fError(400, v.violations[0], v.violations[1]));
        else if (
          i === "dataType" &&
          typeof tmpData !== typeof undefined &&
          ((v.value === "array" && !Array.isArray(tmpData)) ||
            (v.value === "string" && typeof tmpData !== "string"))
        )
          return next(fError(400, v.violations[0], v.violations[1]));

        // console.log(tmpData);
        // console.log(i, v);
      }
      // console.log("-------");
    }
    next();
  };
};

module.exports = validator;
