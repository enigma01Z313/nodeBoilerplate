const { UserMeta } = require("../../../db/MySQL/models");
module.exports = (metaFields, data) =>
  new Promise(async (resolve, reject) => {
    const createUsertMeta = [];
    for (let metaField in metaFields) {
      createUsertMeta.push({
        key: metaField,
        value: data[metaField],
      });
    }

    const createdMeta = await UserMeta.bulkCreate(createUsertMeta);

    resolve(createdMeta);
  }).catch((err) => reject(err));
