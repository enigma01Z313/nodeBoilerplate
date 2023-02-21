const { inspect } = require("../../utils");
const Models = require("../../../db/MySQL/models");
const { bookList: refiner } = require("../../../db/MySQL/refines");

module.exports =
  ({ baseModel, includes }) =>
  async (req, res, next) => {
    const defaultOptions = res?.queryOptions?.defaultOptions ?? {};
    const pagedOptions = res?.queryOptions?.pagedOptions ?? {};

    // inspect(pagedOptions);
    // inspect(defaultOptions);
    // pagedOptions.include = includes.map((include) => {
    //   return { ...include, model: Models[include.model] };
    // });

    const base = res.chainData[baseModel];
    const books = await base.getBooks(pagedOptions);
    const total = await base.getBooks(defaultOptions);

    // console.log('----------------------------------');
    // inspect(pagedOptions);
    // inspect(defaultOptions);
    // console.log(books[0]);

    res.jsonData = { data: refiner(books), total: total.length };
    next();
  };
