var _mm = require('util/mm.js');

var _user = {
  //登录
  login: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/login.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  // 检查用户名是否冲突
  checkUsername: function (username, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/check_valid.do'),
      data: {
        type: 'username',
        str: username
      },
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  //注册
  register: function (userInfo, resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/register.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //检查登录状态
  checkLogin: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //获取密码提示问题
  getQuestion: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_get_question.do'),
      data: {
        username: 'username'
      },
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //检查答案
  checkAnswer: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_check_answer.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //重置密码
  resetPassword: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/forget_reset_password.do'),
      data: userInfo,
      method: 'post',
      success: resolve,
      error: reject
    })
  },
  //登出
  logout: function (resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'post',
      success: resolve,
      error: reject
    })
  }
};

module.exports = _user;