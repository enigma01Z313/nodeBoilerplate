const formidable = require("formidable");
const multiparty = require("multiparty");
const path = require("path");
const fs = require("fs");
const { File } = require("../../../db/mysql/models");
const fError = require("../../utils/fError");
const sizeValidation = require("./_sizeValidation");
const extensionValidation = require("./_extensionValidation");

const uploadFile =
  ({ name: fileName, types: fileTypes, maxAllowedSize: fileMaxAllowedSize }) =>
  async (req, res, next) => {
    const form = new multiparty.Form();
    form.uploadDir = path.resolve("./", "app/tmp/");

    form.parse(req, function (err, fields, files) {
      if (err)
        return next(
          fError(
            400,
            `No File Sent, Files should be sent in 'Formdata' fromat`,
            `فایلی ارسال نشده.`
          )
        );

      const theFile = files[fileName][0];
      const theFileName = theFile.originalFilename;
      const theFileExtension = theFileName.split(".").slice(-1)[0];
      const theFileSize = theFile.size;

      if (!sizeValidation(theFileSize, fileMaxAllowedSize))
        return next(
          fError(
            400,
            `file is too big, max-size: ${fileMaxAllowedSize}`,
            `حجم فایل بیش از حد مجاز است، حجم مجاز: ${fileMaxAllowedSize}`
          )
        );

      if (!extensionValidation(theFileExtension, fileTypes))
        return next(
          fError(
            400,
            `wrong format, acceptable formats: ${fileTypes.join(", ")}`,
            `فرمت فایل غیر مجاز میباشد، فرمت های مجاز: ${fileTypes.join(", ")}`
          )
        );

      const fileNewName = `${(Math.random() * 3000).toString(
        36
      )}.${theFileExtension}`;
      const oldPath = theFile.path;
      const newPath = path.resolve("./", "app/filemanager/", fileNewName);

      fs.rename(oldPath, newPath, async function (err) {
        if (err)
          return next(
            fError(500, err.message, "خطای آپلود فایل، مجدد تلاش نمایید")
          );
        const file = await File.create({
          path: fileNewName,
          name: theFileName,
        });
        res.jsonData = {
          id: file.uuid,
          name: file.name,
        };
        next();
      });
    });
  };

module.exports = uploadFile;
