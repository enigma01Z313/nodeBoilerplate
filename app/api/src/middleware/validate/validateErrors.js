const fError = require("../../utils/fError");

const validateErrors = (
  i,
  v,
  t,
  parameterName,
  parameterNameFa,
  fullBody,
  depth = 0
) => {
  if (
    i === "required" &&
    v.value === true &&
    (typeof t === "undefined" || t === "")
  )
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "atleastOne" && v && !v.value.some((item) => item in fullBody))
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "regex" && t && v.value !== "" && !v.value.test(t))
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "length" && t && t?.length !== v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "maximum" && t && t?.length >= v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (i === "minimum" && t && t?.length <= v.value)
    return fError(400, v.violations[0], v.violations[1]);
  else if (
    i === "range" &&
    typeof t !== typeof undefined &&
    !(t <= v.value[1] && t >= v.value[0])
  )
    return fError(400, v.violations[0], v.violations[1]);
  else if (
    i === "dataType" &&
    typeof t !== typeof undefined &&
    t !== null &&
    ((v.value === "string" && typeof t !== "string") ||
      (v.value === "number" && typeof t !== "number") ||
      (v.value === "boolean" && typeof t !== "boolean"))
  )
    return fError(400, v.violations[0], v.violations[1]);
  else if (
    i === "dataType" &&
    v.value === "array" &&
    typeof t !== typeof undefined &&
    t !== null
  ) {
    if (!Array.isArray(t)) return fError(400, v.violations[0], v.violations[1]);
    else {
      for (item of t) {
        if (typeof v.dataType === "string" && typeof item !== v.dataType)
          return fError(
            400,
            `Expect paramater '${parameterName}' be array and each element be '${v.dataType}'`,
            `پارامتر '${parameterNameFa}' باید آرایه باشد و اعضای آن '${v.dataType}' باشند`
          );
        else if (typeof v.dataType !== "string") {
          const ii = "dataType";
          const vv = {
            value: "object",
            schema: v.dataType,
          };
          const tt = item;
          const validateErr = validateErrors(
            ii,
            vv,
            tt,
            parameterName,
            parameterNameFa
          );

          if (!!validateErr) return validateErr;
        }
      }
    }
  } else if (
    i === "dataType" &&
    typeof t !== typeof undefined &&
    t !== null &&
    v.value === "object"
  ) {
    if (typeof t !== "object")
      return fError(
        400,
        `parameter '${parameterName}' should be type object`,
        `پارامتر '${parameterNameFa}' باید از نوع شیع باشد`
      );

    for (item of v.schema) {
      const tmpData = t[item.parameter];
      for ([i, v] of Object.entries(item.validations)) {
        validateRes = validateErrors(
          i,
          v,
          tmpData,
          item.parameter,
          item.faName,
          fullBody,
          depth + 1
        );

        if (validateRes) {
          console.log(validateRes);

          const isErrorType = validateRes instanceof Error;
          return depth === 0
            ? fError(
                400,
                isErrorType
                  ? `${parameterName}.${v?.violations?.[0]}`
                  : `${parameterName}.${validateRes?.parameterName}.${validateRes?.v?.violations?.[0]}`,
                isErrorType
                  ? `${parameterName}.${v?.violations?.[1]}`
                  : `${parameterName}.${validateRes?.parameterName}.${validateRes?.v?.violations?.[1]}`
              )
            : { v, parameterName };
        }
        //  else return v;
      }
    }
  }
  return false;
};

module.exports = validateErrors;
