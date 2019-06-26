const path = require('path');
const outputDirectory = 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/client/index.html',
  favicon: './src/client/favicon.png'
});

module.exports = {
  entry: './src/client/index.js', //['babel-polyfill', './src/client/index.js'],
  output: {
      path: path.resolve(outputDirectory),
      filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    htmlPlugin
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
};
