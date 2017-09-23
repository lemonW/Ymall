/*
 * @Author: huJiaFu 
 * @Date: 2017-09-14 21:29:14 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-23 14:50:00
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//定义一个HTML文件的设置函数
var setHtmlConfig = function (name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    // 操作提示页的标题
    title: title,
    //在html文件中自动引入
    inject: true,
    //对引入的js文件生成一个hash版本号
    hash: true,
    //引入两个js模块
    chunks: ['common', name],
  }
}

//环境变量配置 dev/ online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'result': ['./src/page/result/index.js']
  },
  output: {
    //文件存放的基准地址
    path: __dirname + '/dist/',
    //文件引入时基准路径
    publicPath: '/dist',
    filename: 'js/[name].js' //[name]为一变量，按入口文件命名, 多类型文件的处理
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
      },
      {
        test: /\.(gif|jpg|png|svg|ttf|eot|woff)\??.*$/,
        use: 'url-loader?limit=4000&name=resource/[name].[ext]' //设置大小基准和保留文件名和文件类型
      },
      {
        test: /\.string$/,
        use: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image',
    }
  },
  plugins: [
    //独立公共模块的处理
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      //此案例中，若入口文件都使用了module.js
      //那么module.js就会打包进base.js中
      //common.js亦然，只是不需要我们手动在各个js文件中引入
      filename: 'js/base.js'
    }),
    //css文件的单独打包
    new ExtractTextPlugin("css/[name].css"),

    new HtmlWebpackPlugin(setHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(setHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(setHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(setHtmlConfig('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(setHtmlConfig('result', '操作结果'))
  ]
};

if (WEBPACK_ENV === 'dev') {
  config.entry.common.push('webpack-dev-server/client? http://localhost:8088/')
}

module.exports = config;