var webpack = require('webpack');
var path = require('path');
const plugins = require('./config/plugins');

// Load environment variables
require('dotenv').config();

const provideJQuery = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Tether: 'tether',
});

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
    rules: require('./config/rules')(__dirname),
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    plugins.defineApiUrl,
  ]
};
