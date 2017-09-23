/*
 * @Author: huJiaFu 
 * @Date: 2017-09-14 21:35:54 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-23 16:22:06
 */

require('./index.css');
require('page/common/nav-simple/index.js');

var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var formError = {
  show: function (err) {
    $('.error-item').show().find('.err-msg').text(err);
  },
  hide: function () {
    $('.error-item').hide().find('.err-msg').text('');
  }
};

var page = {
  //存储用户的数据
  data: {
    username: '',
    question: '',
    answer: '',
    token: ''
  },
  init: function () {
    this.bindEvent();
    this.loadStepUsername();
  },
  //提交事件
  bindEvent: function () {
    var _this = this;
    //输入用户名得到问题
    $('#submit-username').click(function () {
      var username = $.trim($('#username').val());
      if (username) {
        _user.getQuestion(username, function (res) {
          _this.data.username = username;
          _this.data.question = res;
          _this.loadStepQuestion();
        }, function (err) {
          formError.show(err);
        })
      } else {
        formError.show('用户名不能为空')
      }
    });
    //判断答案
    $('#submit-question').click(function () {
      var answer = $.trim($('#answer').val());
      if (answer) {
        _user.checkAnswer({
          username: _this.data.username,
          question: _this.data.question,
          answer: answer,
        }, function (res) {
          _this.data.answer = answer;
          _this.data.token = res;
          _this.loadStepPassword();
        }, function (err) {
          formError.show(err);
        })
      } else {
        formError.show('答案错误')
      }
    });
    //提交新密码
    $('#submit-password').click(function () {
      var password = $.trim($('#password').val());
      if (password && password.length >= 6) {
        _user.resetPassword({
          username: _this.data.username,
          password: _this.data.password,
          forgetToken: _this.data.token
        }, function (res) {
          window.location.href = './result.html?type=password-reset'
        }, function (err) {
          formError.show(err);
        })
      } else {
        formError.show('密码长度至少六位')
      }
    });

  },
  loadStepUsername: function () {
    $('.step-username').show();
  },
  loadStepQuestion: function () {
    formError.hide();
    $('.step-username').hide().siblings('.step-question').show();
    $('.step-question p').text(this.data.question);
  },
  loadStepPassword: function () {
    formError.hide();
    $('.step-question').hide().siblings('.step-password').show();
  }
};

$(function () {
  page.init();
});