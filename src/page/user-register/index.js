/*
 * @Author: huJiaFu 
 * @Date: 2017-09-14 21:35:54 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-09-22 19:03:19
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
    //验证用户名是否已存在
    $('#username').blur(function () {
      var username = $.trim($(this).val());
      //用户名为空，不验证
      if (!username) {
        return;
      }
      _user.checkUsername(username, function (res) {
        formError.hide();
      }, function (err) {
        formError.show(err);
      })
    })

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
      password: $.trim($('#password').val()),
      passwordConfirm: $.trim($('#password-confirm').val()),
      phone: $.trim($('#phone').val()),
      email: $.trim($('#email').val()),
      question: $.trim($('#question').val()),
      answer: $.trim($('#answer').val())
    };
    var validateResult = this.formValidate(formData);

    //验证成功，页面跳转
    if (validateResult.status) {
      _user.register(formData, function (res) {
        window.location.href = './result.html?type=register';
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
      return result;
    };
    if (!_mm.validate(formData.password, 'require')) {
      result.msg = '密码不能为空';
      return result;
    };
    if (formData.password.length < 6) {
      result.msg = '密码长度不得小于六位字符';
      return result;
    };
    if (formData.password !== formData.passwordConfirm) {
      result.msg = '密码不一致';
      return result;
    };
    if (!_mm.validate(formData.phone, 'phone')) {
      result.msg = '手机号码格式错误';
      return result;
    };
    if (!_mm.validate(formData.email, 'email')) {
      result.msg = '邮箱地址格式错误';
      return result;
    };
    if (!_mm.validate(formData.question, 'require')) {
      result.msg = '密码提示问题不能为空';
      return result;
    };
    if (!_mm.validate(formData.answer, 'require')) {
      result.msg = '密码提示答案不能为空';
      return result;
    };
    result.status = true;
    result.msg = '验证成功'
    return result;
  }
};

$(function () {
  page.init();
});
