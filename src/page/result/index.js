
require('./index.css');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');

$(function () {
  //操作提示的对应
  var type = _mm.getUrlParam('type') || 'default';
  $('.' + type + '-success').show();
})
