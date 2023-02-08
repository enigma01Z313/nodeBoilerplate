module.exports = (authorKey) => {
  const authorType = require("../../../../db/staticDb")("authorTypes")();
  const { code } = authorType.find(({ key }) => key === authorKey);
  return code;
};
