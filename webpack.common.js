const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(process.env.npm_package_version)
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: "Flute Site",
            template: './public/index.html',
            hash: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"]}
            },
            {
                test: /\.css$/,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        url: false
                    }  
                }]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true
                        }
                    }
                ]
            }
        ]
    },
    resolve: {extensions: ["*", ".js", ".jsx"]},
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "bundle.js"
    }
};