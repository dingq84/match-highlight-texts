const { resolve } = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");

const config = {
  entry: {
    main: resolve("./src/index.ts"),
  },
  output: {
    path: resolve("dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: ["awesome-typescript-loader?module=es6"],
        exclude: [/node_modules/],
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
