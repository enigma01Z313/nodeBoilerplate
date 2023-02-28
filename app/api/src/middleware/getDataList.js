const { Op } = require("sequelize");
const Models = require("../../db/MySQL/models");
const Refiners = require("../../db/MySQL/refines");
const { inspect, fError } = require("../utils");

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
    const paginationedOptions = res?.dbOptions?.paginationedOptions ?? {};

    const { sortOptions } = res;

    console.log("---------------------------------");
    console.log("---------------------------------");
    inspect({
      ...defaultOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
    });
    console.log("---------------------------------");
    inspect({
      ...paginationedOptions,
      ...createIncludeArray(includeModels),
      order: sortOptions,
      subQuery: false,
    });
    console.log("---------------------------------");
    console.log("---------------------------------");

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
      data:
        refiner && Refiners[refiner]
          ? Refiners[refiner](pagedItems)
          : pagedItems,
      total: items.length,
    };

    return next();
  };

module.exports = getDataList;
