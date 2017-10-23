require('./index.css');

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
//侧边导航
var nav_side = {
  option: {
    name: '',
    navList: [{
        name: 'user-center',
        desc: '个人中心',
        href: './user-center.html'
      },
      {
        name: 'order-list',
        desc: '我的订单',
        href: './order-list.html'
      },
      {
        name: 'pass-update',
        desc: '修改密码',
        href: './user-pass-update.html'
      },
      {
        name: 'about',
        desc: '关于MMALL',
        href: './about.html'
      }
    ]
  },
  init: function (option) {
    //对this.option做合并修改
    $.extend(this.option, option);
    this.renderNav();
  },
  //渲染导航菜单
  renderNav: function () {
    //计算active数据
    for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
      if (this.option.navList[i].name === this.option.name) {
        //这里是为了实现按选中状态渲染内容
        //hogan.js模板语法不支持内部判断，所以先在此处判断
        this.option.navList[i].isActive = true;
      }
    };
    //渲染
    var navHtml = _mm.renderHtml(templateIndex, {
      navList: this.option.navList
    });
    $('.nav-side').html(navHtml);
  }
};
//这里因为需要参数，所以不在内部调用
module.exports = nav_side;