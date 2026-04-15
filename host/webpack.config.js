const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("@module-federation/enhanced/webpack");
const webpack = require("webpack");
const path = require("path");
require("dotenv").config();

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: { transpileOnly: true },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      // No static remotes — all remotes are registered dynamically at runtime
      // via @module-federation/enhanced/runtime init() in src/federation.ts
      shared: {
        react: { singleton: true, requiredVersion: "^18" },
        "react-dom": { singleton: true, requiredVersion: "^18" },
        vue: { singleton: true, requiredVersion: "^3" },
        "@clerk/react": { singleton: true, requiredVersion: "^6" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.14.1" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
