const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    publicPath: 'http://localhost:3002/',
    clean: true,
  },
  resolve: { extensions: ['.vue', '.tsx', '.ts', '.js'] },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: { transpileOnly: true, appendTsSuffixTo: [/\.vue$/] },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: 'remoteVue',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloVue': './src/components/HelloVue.vue',
      },
      shared: {
        vue: { singleton: true, requiredVersion: '^3' },
        "@clerk/clerk-react": { singleton: true, requiredVersion: "^6" },
      },
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    port: 3002,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};
