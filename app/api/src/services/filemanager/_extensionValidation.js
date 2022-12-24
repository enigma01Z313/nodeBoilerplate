const extensionValidation = (theFileExtension, fileTypes) =>
  fileTypes
    .map((item) => {
      return fileTypes[1] === "ci" ? item.toLowerCase() : item;
    })
    .includes(
      fileTypes[1] === "ci" ? theFileExtension.toLowerCase() : theFileExtension
    );

module.exports = extensionValidation;
