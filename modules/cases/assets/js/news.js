/**
 news入口
 **/
layui.define(['layer', 'flow','element','carousel','util'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        flow = layui.flow,
        carousel = layui.carousel,
        util = layui.util;

    flow.load({
        elem: '#policyCon' //指定列表容器
        ,done: function(page, next){ //到达临界点（默认滚动触发），触发下一页
  /*          //模拟数据插入
            setTimeout(function(){
                var lis = [];
                for(var i = 0; i < 3; i++){
                    lis.push('<li>'+ ( (page-1)*8 + i + 1 ) +'</li>')
                }

                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < 10); //假设总页数为 10
            }, 500);*/

            var lis = [];
            //以jQuery的Ajax请求为例，请求下一页数据（注意：page是从2开始返回）
            $.get('/api/list?page='+page, function(res){
                //假设你的列表返回在data集合中
                layui.each(res.data, function(index, item){
                    lis.push('<li>'+ item.title +'</li>');
                });
                //执行下一页渲染，第二参数为：满足“加载更多”的条件，即后面仍有分页
                //pages为Ajax返回的总页数，只有当前页小于总页数的情况下，才会继续出现加载更多
                next(lis.join(''), page < res.pages);
            });
        }
    });
    exports('news', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
