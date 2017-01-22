const path = require('path');

module.exports = function(dirname) {
  return [
    { test: /\.scss$/, loaders: [ "style-loader", "css-loader", "sass-loader" ] },
    { test: /\.css$/, include: path.resolve(dirname, 'app'), loaders: [ 'style-loader', 'css-loader' ] },
    { test: /\.js[x]?$/, include: path.resolve(dirname, 'app'), exclude: /node_modules/, loader: 'babel-loader' },
    { test: /\.gif$/, loader: 'url-loader?mimetype=image/png' }, // Load GIFs
    { // Load SVGs
      test: /\.svg/,
      loaders: [ 'url-loader?mimetype=image/svg' ],
    }, // Load SVGs
    { // Load WOFF
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: [
        'url-loader?limit=10000&mimetype=application/font-woff',
      ],
    },
    { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=[name].[ext]" },
  ];

};
