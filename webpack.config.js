"use strict";

import webpack from "webpack";
import path from "path";
const __dirname = path.resolve();

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import HtmlWebpackPugPlugin from "html-webpack-pug-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

export default {
  mode: "development",
  entry: {
    "script.min.js": [path.resolve(__dirname, "./src/js/index.js")],
    "styles.min": [path.resolve(__dirname, "./src/styles/index.scss")],
  },
  output: {
    filename: "[name]",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/build",
            },
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({ filename: "[name].css" }), // Generating CSS
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "./build"),
    },
    // hot: true,
    port: 8080,
    devMiddleware: {
      writeToDisk: true,
    },
    // contentBase: path.join(__dirname, "./build"),
    // writeToDisk: true,
  },
  // watch: true,
};
