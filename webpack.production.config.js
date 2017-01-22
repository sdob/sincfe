var webpack = require('webpack');
var path = require('path');
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = require('./config/plugins');
const rules = require('./config/rules')(__dirname);

// Load environment variables
require('dotenv').config();

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/main.jsx'),
  ],
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: './bundle.js'
  },
  module: {
    rules,
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    plugins.defineApiUrl,
    new CopyWebpackPlugin([
      { from: './app/index.html', to: 'index.html' },
      { from: './app/img/', to:'./img/' },
    ]),
  ]
};
