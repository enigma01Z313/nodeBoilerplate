const maximum = (length, name, translation) => ({
  parameter: name,
  validations: {
    maximum: {
      value: length,
      violations: [
        `'${name}' length hsould be at maximum ${length} charecter`,
        `طول '${translation}' باید حداکثر ${length} کاراکتر باشد`,
      ],
    },
  },
});

module.exports = maximum;
