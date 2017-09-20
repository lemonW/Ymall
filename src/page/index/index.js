/*
 * @Author: huJiaFu 
 * @Date: 2017-09-18 16:49:46 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-20 16:28:23
 */
// require('./index.css')
//webpack配置文件中配置路径的别名的使用
var _mm = require('util/mm.js');

require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');

navSide.init({
  name: 'user-center'
});