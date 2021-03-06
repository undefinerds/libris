const path = require('path');
const fs = require('fs');
const { dependencies } = require('./package.json');
const webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
        nodeModules[mod] = 'commonjs2 ' + mod;
  });

module.exports = {
  context: __dirname,

  entry: ['babel-polyfill', path.join(process.cwd(), 'javascripts', 'index.js')],

  output: {
    path: path.resolve(__dirname || process.cwd(), 'public'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?importLoaders=1&localIdentName=[path]_[name]_[local]__[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|otf|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  externals: nodeModules,
  target: 'electron'/*,
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ]*/

}
