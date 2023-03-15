const Zibal = require("zibal");
const { merchantCode: merchant } = require("../../../../../config/shop");

module.exports = () => {
  const gateway = new Zibal();
  gateway.init({
    merchant,
    logLevel: 2,
  });

  return gateway;
};
