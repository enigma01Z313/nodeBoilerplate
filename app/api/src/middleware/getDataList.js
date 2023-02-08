const { Op } = require("sequelize");
const Models = require("../../db/MySQL/models");
const fError = require("../utils/fError");
const Refiners = require("../../db/MySQL/refines");

const createIncludeArray = (str) => {
  if (!str) return { include: [] };

  return {
    include: str.split(",").map((item) => Models[item]),
  };
};

const getDataList =
  (model, modelFa, includeModels, orderColumn = "createdAt", refiner) =>
  async (req, res, next) => {
    const defaultOptions = res?.dbOptions?.defaultOptions ?? {};
    const paginationedOptions = res?.dbOptions?.paginationedOptions ?? {
      limit: 10,
      page: 0,
    };

    const { sortOptions } = res;

    const items = await Models[model].findAll({
      ...defaultOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
    });

    const pagedItems = await Models[model].findAll({
      ...paginationedOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
      subQuery: false,
    });

    res.jsonData = {
      data: Refiners[refiner] ? Refiners[refiner]?.(pagedItems) : pagedItems,
      total: items.length,
    };

    return next();
  };

module.exports = getDataList;
