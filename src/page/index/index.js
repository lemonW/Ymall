/*
 * @Author: huJiaFu 
 * @Date: 2017-09-18 16:49:46 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-24 17:22:32
 */
require('./index.css')
//webpack配置文件中配置路径的别名的使用
var _mm = require('util/mm.js');
var templateBanner = require('./banner.string');

require('page/common/nav-simple/index.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
//引入jQuery轮播插件unslider
require('util/slider/index.js')

$(function () {
  // 渲染banner的html
  var bannerHtml = _mm.renderHtml(templateBanner);
  $('.banner-con').html(bannerHtml);
  // 初始化banner
  var $slider = $('.banner').unslider({
    dots: true
  });
  // 前一张和后一张操作的事件绑定
  $('.banner-con .banner-arrow').click(function () {
    var forward = $(this).hasClass('prev') ? 'prev' : 'next';
    $slider.data('unslider')[forward]();
  });
})