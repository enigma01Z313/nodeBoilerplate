const setType = (item, type, faType) => ({
  value: type,
  violations: [
    `'${item.parameter}' should be type ${type}`,
    `'${item.faName}' باید از نوع ${faType} باشد`,
  ],
});

class ValidateF {
  constructor() {
    this.items = [];
    return this;
  }

  //main validations
  param(paramName, faName) {
    faName = faName ?? paramName;
    this.items.push({
      parameter: paramName,
      faName,
      validations: {},
    });

    return this;
  }

  //data types
  object(schema) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = {
      value: "object",
      schema,
    };
    return this;
  }

  array(type) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = setType(lastItem, "array", "آرایه");
    lastItem.validations["dataType"].dataType = type;
    return this;
  }

  string(length) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = setType(lastItem, "string", "رشته");

    if (typeof length !== typeof undefined) this.length(length);
    return this;
  }

  number() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = setType(lastItem, "number", "عدد");
    return this;
  }

  boolean() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = setType(lastItem, "boolean", "بولین");
    return this;
  }

  //validations
  required() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["required"] = {
      value: true,
      violations: [
        `'${lastItem.parameter}' not sent`,
        `'${lastItem.faName}' ارسال نشده است`,
      ],
    };
    return this;
  }

  //or required
  requiredAtLeast(paramList) {
    const generalValidations = {
      parameter: "GENERAL",
      faName: "عمومی",
      validations: {
        atleastOne: {
          value: paramList,
          violations: [
            `at least on of'${paramList.join(", ")}' must be sent`,
            `حداقل یکی پارامترهای '${paramList.join(", ")}' باید ارسال شود`,
          ],
        },
      },
    };
    this.items[this.items.length] = generalValidations;

    return this;
  }

  //others
  regex(pattern) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["regex"] = {
      value: pattern,
      violations: [
        `'${lastItem.parameter}' was sent in wrong format`,
        `${lastItem.faName} با فرمت اشتباه ارسال شده است`,
      ],
    };
    return this;
  }

  length(n) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["length"] = {
      value: n,
      violations: [
        `'${lastItem.parameter}' should consist of ${n} charecters`,
        `طول '${lastItem.faName}' باید ${n} کاراکتر باشد`,
      ],
    };
    return this;
  }

  maximum(n) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["maximum"] = {
      value: n,
      violations: [
        `'${lastItem.parameter}' should atmost be ${n} charecters`,
        `طول '${lastItem.faName}' باید حداکثر ${n} کاراکتر باشد`,
      ],
    };
    return this;
  }

  minimum(n) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["minimum"] = {
      value: n,
      violations: [
        `'${lastItem.parameter}' should atleast be ${n} charecters`,
        `طول '${lastItem.faName}' باید حداقل ${n} کاراکتر باشد`,
      ],
    };
    return this;
  }

  range(m, n) {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["range"] = {
      value: [m, n],
      violations: [
        `'${lastItem.parameter}' should atleast be ${m} and atmost ${n}`,
        `'${lastItem.faName}' باید حداقل ${m} و حداکثر ${n} باشد`,
      ],
    };
    return this;
  }

  //typed required
  requiredString(length) {
    this.required().string(length);

    return this;
  }

  requiredNumber() {
    this.required().number();
    return this;
  }

  requiredArray(type) {
    this.required().array(type);
    return this;
  }

  requiredObject(schema) {
    this.required().object(schema);
    return this;
  }

  done() {
    return this.items;
  }

  //predefined schemas
  phoneSchema() {
    this.param("phone", "تلفن همراه")
      .required()
      .string()
      .regex(/^09[0-9]{9}$/);
    return this;
  }

  //predefined schemas
  emailSchema() {
    this.param("email", "ایمیل")
      .required()
      .string()
      .regex(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
    return this;
  }
}

module.exports = ValidateF;
