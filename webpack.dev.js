const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: false,
    open: true,
  },
});
