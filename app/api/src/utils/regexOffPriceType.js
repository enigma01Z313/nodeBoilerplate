module.exports = (str) => {
  const regex = /^(1|2)$/;

  return regex.test(str);
};
