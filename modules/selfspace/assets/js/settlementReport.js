/**
 页面模块入口
 **/
layui.define(['layer', 'element', 'form', 'layedit', 'laydate', 'table'], function (exports) {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , table = layui.table;


    //结算项目
    table.render({
        elem: '#settlementProjects'
        , url: './assets/mockSettlementProjectData.json' //数据接口
        , width: 948
        /*定义发送请求的参数*/
        /*,request: {
            pageName: 'page' //页码的参数名称，默认：page
            ,limitName: 'limit' //每页数据量的参数名，默认：limit
        }*/
        /*定义接收服务器返回数据的格式要求*/
        , response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            , statusCode: 200 //成功的状态码，默认：0
            , msgName: 'msg' //状态信息的字段名称，默认：msg
            , countName: 'count' //数据总数的字段名称，默认：count
            , dataName: 'data' //数据列表的字段名称，默认：data
        }
        , cols: [[ //表头
            {field: 'sePro', title: '结算项目', fixed: 'left'}
            , {field: 'seAmo', title: '电量', edit: 'number',sort: true}
            , {field: 'sePri', title: '电价',  edit: 'number',sort: true}
            , {field: 'seMon', title: '金额',  edit: 'number',sort: true}
        ]]
        , done: function (res, curr, count) {
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            //得到当前页码
            console.log(curr);
            //得到数据总量
            console.log(count);
        }
    });
    //监听单元格编辑
    table.on('edit(settlementProjects)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        console.log(data)
        layer.msg(data.sePro + '更改为：'+ value);
    });

    //计量装置
    table.render({
        elem: '#meteringDevice'
        , url: './assets/mockMeteringDeviceData.json' //数据接口
        , width: 948
        /*定义发送请求的参数*/
        /*,request: {
            pageName: 'page' //页码的参数名称，默认：page
            ,limitName: 'limit' //每页数据量的参数名，默认：limit
        }*/
        /*定义接收服务器返回数据的格式要求*/
        , response: {
            statusName: 'code' //数据状态的字段名称，默认：code
            , statusCode: 200 //成功的状态码，默认：0
            , msgName: 'msg' //状态信息的字段名称，默认：msg
            , countName: 'count' //数据总数的字段名称，默认：count
            , dataName: 'data' //数据列表的字段名称，默认：data
        }
        , cols: [[ //表头
            {field: 'dev', title: '计量装置', edit: 'number', fixed: 'left'}
            , {field: 'timeInt', title: '时段', edit: 'number'}
            , {field: 'lastTable', title: '上月表底', edit: 'number',sort: true}
            , {field: 'nowTable', title: '本月表底',  edit: 'number',sort: true}
            , {field: 'rate', title: '倍率',  edit: 'number',sort: true}
            , {field: 'amount', title: '电量',  edit: 'number',sort: true}
        ]]
        , done: function (res, curr, count) {
            //如果是异步请求数据方式，res即为你接口返回的信息。
            //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
            console.log(res);
            //得到当前页码
            console.log(curr);
            //得到数据总量
            console.log(count);
        }
    });
    //监听单元格编辑
    table.on('edit(meteringDevice)', function(obj){
        var value = obj.value //得到修改后的值
            ,data = obj.data //得到所在行所有键值
            ,field = obj.field; //得到字段
        console.log(data)
        layer.msg(data.sePro + '更改为：'+ value);
    });

    //日期
    laydate.render({
        elem: '#date',
        type: 'month',
        value: new Date(),
    });
    //创建一个编辑器
    var editIndex = layedit.build('LAY_demo_editor');
    //自定义验证规则
    form.verify({
        title: function (value) {
            if (value.length < 5) {
                return '标题至少得5个字符啊';
            }
        }
        , pass: [/(.+){6,12}$/, '密码必须6到12位']
        , content: function (value) {
            layedit.sync(editIndex);
        }
    });
    //监听提交
    form.on('submit(demo1)', function (data) {
        layer.alert(JSON.stringify(data.field), {
            title: '最终的提交信息'
        })
        return false;
    });

    exports('settlementReport', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
