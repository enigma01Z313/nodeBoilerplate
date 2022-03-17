const minimum = (length, name, translation) => ({
  parameter: name,
  validations: {
    minimum: {
      value: length,
      violations: [
        `'${name}' length hsould be at minimum ${length} charecter`,
        `طول '${translation}' باید حداقل ${length} کاراکتر باشد`,
      ],
    },
  },
});

module.exports = minimum;
