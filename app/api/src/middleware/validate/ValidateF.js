class ValidateF {
  constructor() {
    this.items = [];
    return this;
  }

  //main validations
  param(paramName, faName) {
    this.items.push({
      parameter: paramName,
      faName,
      validations: {},
    });

    return this;
  }

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

  //data types
  array() {
    const lastItem = this.items[this.items.length - 1];
    lastItem.validations["dataType"] = {
      value: "array",
      violations: [
        `'${lastItem.parameter}' should be type array`,
        `'${lastItem.faName}' باید از نوع آرایه باشد`,
      ],
    };
    return this;
  }

  done() {
    return this.items;
  }

  //predefined schemas
  phoneSchema() {
    this.param("phone", "تلفن همراه")
      .required()
      .regex(/^09[0-9]{9}$/);
    return this;
  }
}

module.exports = ValidateF;
