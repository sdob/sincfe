var webpack = require('webpack');
var path = require('path');

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
    rules: require('./config/rules')(__dirname),
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_URL: `'${process.env.API_URL}'`,
    }),
  ]
};
