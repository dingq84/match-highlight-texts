const path = require("path");
const fs = require("fs");
const TerserPlugin = require("terser-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const config = {
  entry: resolveApp("./src/index.ts"),
  mode: "production",
  output: {
    path: resolveApp("dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })],
  },
};

module.exports = config;
