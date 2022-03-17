const required = require("../blocks/required");

const isRequired = (name, translation) => ({
  parameter: name,
  validations: {
    required: required(name, translation),
  },
});

module.exports = isRequired;
