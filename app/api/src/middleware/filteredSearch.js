const { Op } = require("sequelize");
const { fError, inspect } = require("../utils");
const Model = require("../../db/MySQL/models");

module.exports = (data) => async (req, res, next) => {
  const {
    dbOptions: { defaultOptions, paginationedOptions, whereAnd },
  } = res;
  const { s: search } = req.query;
  const model = data.model;
  const fields = data.fields;
  const whichField = [];

  inspect(data);
  if (search) {
    for (const field of fields) {
      whichField.push({
        [field]: {
          [Op.like]: `%${search}%`,
        },
      });
    }

    const whereOption = {
      [Op.or]: whichField,
    };

    defaultOptions.where[whereAnd].push(whereOption);
    paginationedOptions.where[whereAnd].push(whereOption);
  }

  // inspect(whereAnd);
  // inspect(defaultOptions.where);
  // inspect(defaultOptions.where[whereAnd]);

  next();
};
