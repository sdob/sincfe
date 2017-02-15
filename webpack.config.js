var webpack = require('webpack');
var path = require('path');
const plugins = require('./config/plugins');
const rules = require('./config/rules');

// Load environment variables
require('dotenv').config();

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './app',
    port: 8080
  },
  entry: [
    path.resolve(__dirname, 'app/main.jsx')
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    rules: rules(__dirname),
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  plugins: [
    plugins.provideJQuery,
    new webpack.HotModuleReplacementPlugin(),
    plugins.defineApiUrl,
  ]
};
