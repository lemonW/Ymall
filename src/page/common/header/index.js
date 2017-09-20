require('./index.css')
var _mm = require('util/mm.js');

var header = {
  init: function () {
    this.bindEvent();
  },
  //搜索后框内的显示
  onLoad: function () {
    var keyword = _mm.getUrlParam('keyword');
    if (keyword) {
      $('#search-btn').val(keyword);
    };
  },
  bindEvent: function () {
    var _this = this;
    $('#search-btn').click(function () {
      _this.searchSubmit();
    });
    //按下回车键
    $('#search-input').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.searchSubmit();
      }
    })
  },
  //搜索提交
  searchSubmit: function () {
    var keyword = $.trim($('#search-input').val());
    if (keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else {
      _mm.goHome();
    }
  }
}

header.init();