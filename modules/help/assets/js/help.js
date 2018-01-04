/**
 news入口
 **/
layui.define(['layer', 'flow','element','carousel','util'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        flow = layui.flow,
        carousel = layui.carousel,
        util = layui.util;
    //固定右下角工具
    util.fixbar({
        bar1: true
        ,bar2: true
        ,css: {right: 50, bottom: 100}
        ,bgcolor: '#393D49'
        ,click: function(type){
            if(type === 'bar1'){
                openwindow('http://p.qiao.baidu.com/cps/chat?siteId=11555035&userId=22742801','', '585','540')
            } else if(type === 'bar2') {
                layer.msg('打算用来做帮助文档')
            }else if(type === 'top'){
                $('html,body').animate({
                    'scrollTop': 0
                }, 500);
            }
        }
    });
    exports('news', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
