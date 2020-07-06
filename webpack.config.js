var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: "bundle.js",
    publicPath: "/static/"
  },
  devtool: false,
  devServer:{
        contentBase: 'static'
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'js'),
        use: 'babel-loader'
      }
    ]
  }
};
