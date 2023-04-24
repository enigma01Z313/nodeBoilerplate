const { File } = require("../../../../db/MySQL/models");

const fileTypes = require("../../../../db/staticDb")("fileTypes")();

module.exports = (bookId, files, bodyFiles) =>
  new Promise(async (res, rej) => {
    if (!bodyFiles) return res();

    for (const fileType of fileTypes) {
      const thiTypeFile = bodyFiles[fileType.key];

      if (thiTypeFile) {
        const { main, sample } = thiTypeFile;
        if (!main) {
          rej({
            err: "pdf main file not sent",
            message: "فایل اصلی pdf ارسال نشده",
          });
        }

        const { pageCount: mainPageCount, file: mainFile } = main;
        const mainUpdate = {
          hasOwner: true,
          book_id: bookId,
        };
        if (mainPageCount) {
          mainUpdate.metaData = JSON.stringify({
            pageCount: { label: "تعداد صفحات", value: mainPageCount },
          });
        }
        await File.update(mainUpdate, { where: { uuid: mainFile } });

        if (sample) {
          const { pageCount: samplePageCount, file: sampleFile } = sample;

          if (sampleFile) {
            const sampleUpdate = {
              hasOwner: true,
              isSample: true,
              book_id: bookId,
            };

            if (samplePageCount) {
              sampleUpdate.metaData = JSON.stringify({
                pageCount: { label: "تعداد صفحات", value: samplePageCount },
              });
            }

            await File.update(sampleUpdate, { where: { uuid: sampleFile } });
          }
        }
      }
    }

    res();
  });
