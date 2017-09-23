/*
 * @Author: huJiaFu 
 * @Date: 2017-09-18 16:49:46 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-23 20:53:00
 */
require('./index.css')
//webpack配置文件中配置路径的别名的使用
var _mm = require('util/mm.js');

require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
require('page/common/header/index.js');
var templateIndex = require('./index.string')
var _user = require('service/user-service.js')
var page = {
  init: function () {
    this.onLoad();
  },
  onLoad: function () {
    //初始化左侧
    navSide.init({
      name: 'user-center'
    });
    //加载用户信息
    this.loadUserInfo();
  },
  loadUserInfo: function () {
    var userHtml = '';
    _user.getUserInfo(function (res) {
      userHtml = _mm.renderHtml(templateIndex, res);
      $('.panel-body').html(userHtml);
    }, function (errMsg) {
      _mm.errorTips(errMsg);
    });
  }
}

$(function () {
  page.init();
})