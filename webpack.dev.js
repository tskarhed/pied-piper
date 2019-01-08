const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname),
    port: 3000,
    publicPath: "http://localhost:3000/",
    hotOnly: true
    },
    devtool: "eval-source-map",
    plugins: [new webpack.HotModuleReplacementPlugin()]
});