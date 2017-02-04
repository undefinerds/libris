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
  devtool: 'source-map',

  entry: ['babel-polyfill', 'webpack/hot/dev-server', './javascripts/index.js'],

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/built/'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: 'http://localhost:8080/built/'
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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  externals: nodeModules,
  target: 'electron-renderer',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

 // resolve: {
   // extensions: ['', '.js', '.jsx', '.json', '.node' ]
 // }
}
