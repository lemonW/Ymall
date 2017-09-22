/*
 * @Author: huJiaFu 
 * @Date: 2017-09-14 21:35:54 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-21 17:37:52
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
  init: function () {
    this.bindEvent();
  },
  //提交事件
  bindEvent: function () {
    var _this = this;
    $('#submit').click(function () {
      _this.submit();
    });

    $('.user-content').keyup(function (e) {
      if (e.keyCode === 13) {
        _this.submit();
      }
    })
  },
  submit: function () {
    var formData = {
      username: $.trim($('#username').val()),
      password: $.trim($('#password').val())
    };
    var validateResult = this.formValidate(formData);
    //验证成功
    if (validateResult.status) {
      _user.login(formData, function (res) {
        window.location.href = _mm.getUrlParam('redirect') || './index.html';
      }, function (err) {
        formError.show(err);
      })
    } else {
      formError.show(validateResult.msg);
    }
  },
  //表单字段验证
  formValidate: function (formData) {
    var result = {
      status: false,
      msg: ''
    };
    if (!_mm.validate(formData.username, 'require')) {
      result.msg = '用户名不能为空';
      console.log(formData.username);
      return result
    };
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result
    };
    result.status = true;
    result.msg = '验证成功'
    return result
  }
};

$(function () {
  page.init();
});