const length = (length, name, translation) => ({
  parameter: name,
  validations: {
    length: {
      value: length,
      violations: [
        `'${name}' length hsould be ${length} charecter`,
        `طول '${translation}' باید ${length} کاراکتر باشد`,
      ],
    },
  },
});

module.exports = length;
