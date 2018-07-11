const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const isItProduction = process.argv.indexOf('--env.prod') !== -1
console.log('is it Production -------------------', isItProduction)

  module.exports = {
    entry: {
      app: [
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        './src-client/index.js'
      ] 
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 5000,
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
     new webpack.HotModuleReplacementPlugin(),
     new webpack.EnvironmentPlugin({
      NODE_ENV: isItProduction ? 'prod' : 'dev', // use 'development' unless process.env.NODE_ENV is defined
      DEBUG: false
    })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };