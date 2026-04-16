const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require('@module-federation/enhanced/webpack');

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    publicPath: "http://localhost:3001/",
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "remoteReact",
      filename: "react_remote_entry.js",
      exposes: {
        "./Counter": "./src/components/Counter.tsx",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18" },
        "react-dom": { singleton: true, requiredVersion: "^18" },
        "react-router-dom": { singleton: true, requiredVersion: "^7.14.1" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
  devServer: {
    port: 3001,
    hot: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
};

