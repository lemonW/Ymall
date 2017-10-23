/*
 * @Author: huJiaFu 
 * @Date: 2017-09-18 16:08:30 
 * @Last Modified by: huJiaFu
 * @Last Modified time: 2017-10-15 17:52:43
 */
var conf = {
  serverHost: ''
};
var Hogan = require('hogan.js');
var _mm = {
  request: function (param) {
    //保存_mm对象
    var _this = this;

    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function (res) {
        //请求成功
        if (res.status === 0) {
          //类型为函数时才传参并执行
          typeof param.success === 'function' && param.success(res.data, res.msg)
        }
        //没有登录，强制进入登录页面
        else if (res.status === 10) {
          _this.doLogin();
        }
        //请求的数据错误
        else if (res.status === 1) {
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error: function (err) {
        typeof param.error === 'function' && param.error(err.status);
      }
    });
  },
  //接口
  getServerUrl: function (path) {
    return conf.serverHost + path;
  },
  //获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    //截取到？后面的字符串再验证，此处只能匹配一次
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  //html模板渲染
  renderHtml: function (htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate);
    var output = template.render(data);
    return output;
  },
  successTips: function (msg) {
    alert(msg || "操作成功！");
  },
  errorTips: function (err) {
    alert(err || '操作失败。');
  },
  //判断非空、手机、邮箱
  validate: function (value, type) {
    //将非字符串自动转为字符串，并移除字符串开始和结尾处的空白字符
    var value = $.trim(value);
    //非空验证
    if (type === 'require') {
      return !!value;
    }
    if (type === 'phone') {
      return /^\d{11}$/.test(value);
    }
    if (type === 'email') {
      return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    }
  },
  //进入登录页面
  doLogin: function () {
    //将当前页面的url编码后传入再跳转，以便登录完成后跳回登录前的页面
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },
  //首页
  goHome: function () {
    window.location.href = './index.html';
  }
};

module.exports = _mm;