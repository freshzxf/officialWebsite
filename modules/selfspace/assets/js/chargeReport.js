/**
 news入口
 **/
layui.define(['layer','element','table'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        table = layui.table;

    //第一个实例
    table.render({
        elem: '#chargeTable'
        ,url: './assets/mockChargeData.json' //数据接口
        ,width: 950
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
            {field: 'chargeDate', title: '年月日期',width:110,}
            ,{field: 'chargeReal', title: '实际用电量（wkwh）',sort: true}
            ,{field: 'chargeContract', title: '合同用电量(wkwh)',sort: true}
            ,{field: 'chargeSurplus', title: '剩余用电量(wkwh)',sort: true}
            ,{field: 'chargeAmount', title: '偏差量(wkwh)/偏差率(%)', sort: true}
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

    exports('chargeReport', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
