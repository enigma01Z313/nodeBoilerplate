const updateTranslation =
  (model, modelUpdateData, translationUpdateData) => async (req, res, next) => {
    const { setLang: lang } = res;

    const oldModel = res[model],
      oldModelTranslation = res[`${model}Translation`];

    let mUppedData = false,
      tUppdeData = false,
      newModel = oldModel,
      newModelTranslation = oldModelTranslation,
      finalRes = {};

    modelUpdateData.forEach((element) => {
      if (
        typeof req.body[element] !== typeof undefined &&
        oldModel[element].toString() !== req.body[element].toString()
      )
        oldModel[element] = mUppedData = req.body[element];
    });

    if (mUppedData !== false) {
      newModel = await oldModel.save();
    }

    translationUpdateData.forEach((element) => {
      if (
        typeof req.body[element] !== typeof undefined &&
        oldModelTranslation[element].toString() !== req.body[element].toString()
      )
        oldModelTranslation[element] = tUppdeData = req.body[element];
    });

    if (tUppdeData !== false) {
      newModelTranslation = await oldModelTranslation.save();
    }

    if (mUppedData === false && tUppdeData === false) {
      res.statusCode = 204;
      return next();
    }

    finalRes = {
      id: newModel.uuid,
      lang,
      updatedAt: newModel.updatedAt,
      createdAt: newModel.createdAt,
    };

    modelUpdateData.forEach((item) => {
      finalRes[item] = newModel[item];
    });
    translationUpdateData.forEach((item) => {
      finalRes[item] = newModelTranslation[item];
    });

    res.jsonData = finalRes;
    next();
  };

module.exports = updateTranslation;
