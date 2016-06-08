var sGrid = require('s-grid');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app/App.js'
  ],
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[hash].js',
    publicPath: '/html/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Panli 专题代购列表页 React 重构!',
      template: './index_template.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.styl$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style!css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!stylus-loader'
      },
      {
        test: /.scss$/,
        exclude: /node_modules/,
        loaders: ["style", "css", "sass?config=otherSassLoaderConfig"]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?name=images/[name].[ext]&limit=8192'
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, '..', 'app'),
    extensions: ['', '.js', '.jsx', '.json', '.css', '.styl', '.png', '.jpg', '.jpeg', '.gif', '.svg']
  },
  stylus: function () {
    return [rupture]
  },
  postcss: function () {
    return [autoprefixer];
  }
};
