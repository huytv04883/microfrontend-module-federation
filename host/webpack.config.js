const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const webpack = require("webpack");
require("dotenv").config();

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    publicPath: "http://localhost:3000/",
    clean: true,
  },
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: { transpileOnly: true },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        // format: "<name>@<url>/remoteEntry.js"
        remoteReact: "remoteReact@http://localhost:3001/remoteEntry.js",
        remoteVue: "remoteVue@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18" },
        "react-dom": { singleton: true, requiredVersion: "^18" },
        vue: { singleton: true, requiredVersion: "^3" },
        "@clerk/clerk-react": { singleton: true, requiredVersion: "^6" },
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
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};
