module.exports = {
  goBig(num, degree = 9) {
    return num * 10 ** degree;
  },
  goSmall(num, degree = 9) {
    return num / 10 ** degree;
  },
};
