const { inspect } = require("../../utils");
const Models = require("../../../db/MySQL/models");
const { bookList: refiner } = require("../../../db/MySQL/refines");

module.exports =
  ({ baseModel, includes }) =>
  async (req, res, next) => {
    const defaultOptions = res?.dbOptions?.defaultOptions ?? {};
    const paginationedOptions = res?.dbOptions?.paginationedOptions ?? {
      limit: 10,
      page: 0,
    };

    paginationedOptions.include = includes.map((include) => {
      return { ...include, model: Models[include.model] };
    });

    const base = res.chainData[baseModel];
    const books = await base.getBooks(paginationedOptions);
    const total = await base.getBooks(defaultOptions);

    res.jsonData = { data: refiner(books), total: total.length };
    next();
  };
