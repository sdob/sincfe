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
    rules: [
      { test: /\.scss$/, loaders: [ "style-loader", "css-loader", "sass-loader" ] },
      { test: /\.css$/, include: path.resolve(__dirname, 'app'), loaders: [ 'style-loader', 'css-loader' ] },
      { test: /\.js[x]?$/, include: path.resolve(__dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' }, // Load GIFs
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
    ]
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
