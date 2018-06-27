const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

  module.exports = {
    entry: {
      app: './src-client/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 3000,
      host: '0.0.0.0'
    },
    mode: 'development',
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: [ 
        {
          test: /\.js$/,
          exclude: /node_modules|packages/,
          use: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          include: [
            path.resolve(__dirname, './src-client/vendor/assets/icons')
          ],
          use: [{
            loader: 'html-loader',
            options: { minimize: true }
          }]
        }
      ]
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'CPAY Intercom',
        template: 'index.html'
      }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };