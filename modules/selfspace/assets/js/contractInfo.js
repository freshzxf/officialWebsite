/**
 news入口
 **/
layui.define(['layer','element','table'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        table = layui.table;

    //第一个实例
    table.render({
        elem: '#retailTable'
        ,url: './assets/mockContractRetailData.json' //数据接口
        ,width: 948
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
            {field: 'numbers', title: '序号', type: 'numbers',width:110,fixed:'left'}
            ,{field: 'sellFrim', title: '售电公司名称'}
            ,{field: 'provideFrim', title: '供电公司名称'}
            ,{field: 'signDate', title: '签订日期',sort: true}
            ,{field: 'startDate', title: '开始日期',sort: true}
            ,{field: 'endDate', title: '结束日期', sort: true}
            ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtnsRetail', fixed: 'right'}
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
        ,page: true //是否显示分页
    });
    //监听工具条
    table.on('tool(retailTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            layer.msg('预览操作retailTable');
        }else if(obj.event === 'download'){
            layer.alert('下载文件：<br>'+ JSON.stringify(data))
        }
    });

    //第二个实例
    table.render({
        elem: '#purchaseSaleTable'
        ,url: './assets/mockContractPurchaseSaleData.json' //数据接口
        ,width: 948
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
            {field: 'numbers', title: '序号', type: 'numbers',width:110,fixed:'left'}
            ,{field: 'sellFrim', title: '售电公司名称'}
            ,{field: 'signDate', title: '签订日期',sort: true}
            ,{field: 'startDate', title: '开始日期',sort: true}
            ,{field: 'endDate', title: '结束日期', sort: true}
            ,{field: 'contractTotal', title: '合同总电量（wkwh）', sort: true}
            ,{field: 'action', title: '操作',width:150, align:'center', toolbar: '#toolBtnsPurchaseSale', fixed: 'right'}
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
        ,page: true //是否显示分页
    });
    //监听工具条
    table.on('tool(purchaseSaleTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'preview'){
            layer.msg('预览操作purchaseSaleTable');
        }else if(obj.event === 'download'){
            layer.alert('下载文件：<br>'+ JSON.stringify(data))
        }
    });

    exports('contractInfo', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
