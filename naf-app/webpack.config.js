const webpack = require('webpack');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
module.exports = {
  entry: [
  'react-hot-loader/patch?reload=true',
  'webpack-dev-server/client',
  './src/index.js',
	'./src/styles/app.scss'
  ],
  module: {
  devtool: 'inline-source-map',
	preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
	loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json?$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
      },
      { test: /\.(jpe?g|png|gif|ico|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'images/[name].[ext]'
        }
      }
    ]
  },
  resolve: { modulesDirectories: ['node_modules'] },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].bundle.js',
    publicPath:'http://localhost:5000/'
  },
  devtool: "inline-source-map",
  plugins: [
    new ExtractTextPlugin('styles/[name]-[hash].min.css'),
    
    new webpack.HotModuleReplacementPlugin(),
    new ReactRootPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      alwaysWriteToDisk: true
    }),
 ],
  devServer: {
    port: 5000,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    hot: true
  }
};
