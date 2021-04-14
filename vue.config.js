const path = require("path");

const host = process.env.HOST || "http://127.0.0.1";
const port = process.env.PORT || 3000;

module.exports = {
  devServer: {
    proxy: {
      "/clients": {
        target: host + ":" + port,
      },
      "/providers": {
        target: host + ":" + port,
      },
    },
  },
};
