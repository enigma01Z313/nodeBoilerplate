const mongoose = require("mongoose");

class MainSchema {
  constructor(newParams = {}, transformCb) {
    //defaitFields
    const mainSchema = new mongoose.Schema({
      ...newParams,
      createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
      },
      updatedAt: {
        type: Date,
        default: () => Date.now(),
      },
    });

    //default hooks
    mainSchema.pre("save", function (next) {
      this.updatedAt = Date.now();
      next();
    });

    mainSchema.set("toJSON", {
      transform: function (doc, ret) {
        ret.id = ret._id;
        if (transformCb) transformCb(doc, ret);
      },
    });

    return mainSchema;
  }
}

module.exports = MainSchema;
