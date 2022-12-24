const Models = require("../../../db/mysql/models");

const addTranslation = (model, data) => async (req, res, next) => {
  const { setLang: lang } = res;

  const newTranslationData = {
    packageId: res[model].id,
    lang,
  };
  data.forEach((element) => {
    newTranslationData[element] = req.body[element];
  });

  const item = await Models[`${model}Translation`].create(newTranslationData);

  res.statusCode = 201;
  res.jsonData = {
    id: res[model].uuid,
    duration: res[model].duration,
    imageId: res[model].imgId,
    name: item.name,
    description: item.description,
    price: item.price,
    lang: item.lang,
  };

  next();
};

module.exports = addTranslation;
