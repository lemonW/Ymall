require('./index.css')
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
var nav = {
  init: function () {
    this.bindEvent();
    this.loadUserInfo();
    this.loadCartCount();
    //链式编程原理，返回调用者本身
    return this;
  },
  bindEvent: function () {
    //登录
    $('.js-login').click(function () {
      _mm.doLogin();
    });
    //注册
    $('.js-register').click(function () {
      window.location.href = './register.html';
    });
    //退出
    $('.js-logout').click(function () {
      _user.logout(function (res) {
        //刷新页面
        window.location.reload();
      }, function (err) {
        _mm.errorTips(err);
      })
    })
  },
  //加载用户信息
  loadUserInfo: function () {
    _user.checkLogin(function (res) {
      $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
    }, function (err) {
      //do nothing
    });
  },
  //购物车商品数量
  loadCartCount: function () {
    _cart.getCartCount(function (res) {
      $('.nav.cart-count').text(res || 0);
    }, function (err) {
      $('.nav.cart-count').text(0);
    });
  }
};

//这里先初始化
module.exports = nav.init();