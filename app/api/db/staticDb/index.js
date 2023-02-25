module.exports = (statusChunkName) => {
  const statusChunk = require("./db")[statusChunkName];

  return (code) =>
    code !== undefined
      ? statusChunk.find((item) => item.code === +code)
      : statusChunk;
};
