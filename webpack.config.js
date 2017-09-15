/*
 * @Author: huJiaFu 
 * @Date: 2017-09-14 21:29:14 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-15 17:21:37
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js' //按入口文件命名, 多类型文件的处理
  },
  //外部文件的模块化引入
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  //公共模块的处理
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      //此案例中，若入口文件都使用了module.js
      //那么module.js就会打包进base.js中
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin("css/[name].css"),
  ]
};

module.exports = config;