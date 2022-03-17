const required = (name, translation) => ({
  value: true,
  violations: [`'${name}' not sent`, `'${translation}' ارسال نشده است`],
});

module.exports = required;
