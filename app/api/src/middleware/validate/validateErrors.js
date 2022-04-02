const fError = require("../../utils/fError");

const validateErrors = (i, v, t, parameterName) => {
  //check for required validation
  if (
    i === "required" &&
    v.value === true &&
    (typeof t === "undefined" || t === "")
  )
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "regex" && v.value !== "" && !v.value.test(t))
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "length" && t?.length !== v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "maximum" && t?.length >= v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "minimum" && t?.length <= v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (
    i === "dataType" &&
    typeof t !== typeof undefined &&
    ((v.value === "string" && typeof t !== "string") ||
      (v.value === "number" && typeof t !== "number"))
  )
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "dataType" && v.value === "array") {
    if (!Array.isArray(t)) return fError(400, v.violations[0], v.violations[1]);
    else {
      for (item of t) {
        if (typeof v.dataType === "string" && typeof item !== v.dataType)
          return fError(
            400,
            `Expect paramater '${parameterName}' be array and each element be '${v.dataType}'`,
            `پارامتر '${parameterName}' باید آرایه باشد و اعضای آن '${v.dataType}' باشند`
          );
        else if (typeof v.dataType !== "string") {
          for (tmpData of t) {
            for ([j, k] of Object.entries(v.dataType)) {
              validateRes = validateErrors(j, k, tmpData, item.parameter);
            }
          }
          console.log(i);
          console.log(v);
          console.log(t);
          console.log("---------------------");
        }
      }
    }
  } else if (
    i === "dataType" &&
    typeof t !== typeof undefined &&
    v.value === "object"
  ) {
    for (item of v.schema) {
      const tmpData = t[item.parameter];
      for ([i, v] of Object.entries(item.validations)) {
        validateRes = validateErrors(i, v, tmpData, item.parameter);
        if (validateRes)
          return fError(
            400,
            `${parameterName}.${v.violations[0]}`,
            `${parameterName}.${v.violations[1]}`
          );
      }
    }
  }
  return false;
};

module.exports = validateErrors;
