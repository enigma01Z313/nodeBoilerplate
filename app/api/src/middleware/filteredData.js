const { Op } = require("sequelize");
const { inspect } = require("../utils");

const filteredData =
  (exclude = {}, translatedModel) =>
  (req, res, next) => {
    const whereOptions = [];
    whereOptions.push(exclude);
    const { page, limit, status, role, excludeThis } = req.query;
    const { setLang } = res;

    //filters section
    if (status) whereOptions.push({ status });

    if (setLang)
      whereOptions.push({
        [`$${translatedModel}Translations.lang$`]: setLang,
      });

    if (role) whereOptions.push({ [`$Role.uuid$`]: role });

    if (excludeThis) whereOptions.push({ uuid: { [Op.ne]: excludeThis } });

    const whereAnd = Op.and;
    const defaultOptions = { where: { [whereAnd]: [...whereOptions] } };
    const paginationedOptions = Object.assign({}, defaultOptions);

    //pagination section
    if (limit && limit !== "undefined")
      paginationedOptions.limit = parseInt(limit);
    if (page && limit !== "undefined") {
      const limits = limit ?? 10;
      const pageNum = page > 0 ? parseInt(page) - 1 : 0;

      paginationedOptions.limit = parseInt(limits);
      paginationedOptions.offset = pageNum * parseInt(limits);
    }

    res.dbOptions = { defaultOptions, paginationedOptions, whereAnd };
    next();
  };

module.exports = filteredData;
