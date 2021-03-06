const webpack = require('webpack');
require('dotenv').config('../.env'); // .env is in the project root

const defineApiUrl = new webpack.DefinePlugin({
  API_URL: `'${process.env.API_URL}'`,
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

const provideJQuery = new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery',
  Tether: 'tether',
});

module.exports = {
  defineApiUrl: defineApiUrl,
  provideJQuery: provideJQuery
};
