/**
 news入口
 **/
layui.define(['layer', 'table'], function(exports){
    var layer = layui.layer,
        table = layui.table,
        form = layui.form;

    //第一个实例
    table.render({
        elem: '#filesTable'
        ,url: './assets/mockFilesData.json' //数据接口
        ,page: true //是否显示分页
        /*定义发送请求的参数*/
        /*,request: {
            pageName: 'page' //页码的参数名称，默认：page
            ,limitName: 'limit' //每页数据量的参数名，默认：limit
        }*/
        /*定义接收服务器返回数据的格式要求*/
        ,response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            ,statusCode: 200 //成功的状态码，默认：0
            ,msgName: 'msg' //状态信息的字段名称，默认：msg
            ,countName: 'count' //数据总数的字段名称，默认：count
            ,dataName: 'data' //数据列表的字段名称，默认：data
        }
        ,cols: [[ //表头
            {field: 'id', title: 'ID', width:150,sort: true, fixed: 'left'}
            ,{field: 'fileName', title: '文件名称'}
            ,{field: 'fileExt', title: '文件格式',sort: true}
            ,{field: 'fileSize', title: '文件大小(M)',sort: true}
            ,{field: 'uploadTime', title: '上次时间',sort: true}
            ,{field: 'downloadTimes', title: '下载次数', width:150,sort: true}
            ,{field: 'download', title: '操作', width:150, align:'center', toolbar: '#toolBtns'}
        ]]
        , done: function(res, curr, count){
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            //得到当前页码
            console.log(curr);
            //得到数据总量
            console.log(count);
        }
    });

    //监听工具条
    table.on('tool(filesTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            layer.msg('ID：'+ data.id + ' 的预览操作');
        }else if(obj.event === 'download'){
            layer.alert('下载文件：<br>'+ JSON.stringify(data))
        }
    });

    exports('files', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
