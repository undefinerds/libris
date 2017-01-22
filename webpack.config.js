var webpack = require('webpack');
var liveReloadPlugin = require('webpack-livereload-plugin');
module.exports = {
    entry: {
        app: ['webpack/hot/dev-server', './javascripts/index.js'],
    },
  output: {
      path: './public/built',
      filename: 'bundle.js',
      publicPath: 'http://localhost:8080/built/'
  },
  devServer: {
      contentBase: './public',
      publicPath: 'http://localhost:8080/built/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loaders: [
        'style-loader', 'css-loader?importLoaders=1&localIdentName=[path]_[name]_[local]__[hash:base64:5]',
        'postcss-loader'
      ] },
    ]
  },
  plugins: [
     new webpack.HotModuleReplacementPlugin(),
     new liveReloadPlugin({
       port: 8081,
       appendScriptTag: true
     })
  ],
  target: 'electron-renderer'
}

