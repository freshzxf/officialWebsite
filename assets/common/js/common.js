/**
 各个页面共用的脚本
 **/

function windowOpen(url, name, iWidth, iHeight) {
    // url 转向网页的地址
    // name 网页名称，可为空
    // iWidth 弹出窗口的宽度
    // iHeight 弹出窗口的高度
    //window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
    var iTop = (window.screen.height - 30 - iHeight) / 2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width - 10 - iWidth) / 2; //获得窗口的水平位置;
    window.open(url, name, 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
}

/* 页面基本参数获取 */
var win_width = $(window).width();
var win_height = $(window).height();
var lay;
layui.config({
    base: '../../assets/common/layui/lay/extendModules/' //设定扩展的Layui模块的所在目录，一般用于外部模块扩展
});
if (typeof ajaxlayui === 'undefined') {
    /*加载pjax文件，只加载一次*/
    var ajaxlayui = true;
    layui.extend({
        pjax: 'pjax'
    });
    layui.use(['pjax', 'layer', 'flow', 'util', 'carousel', 'layedit'], function () {
        lay = layui;
        util = lay.util;
        lay.pjax.on('change', function (isInitialLoad) {
            if (isInitialLoad === false) {
                /*兼容百度统计*/
                if (typeof _hmt !== 'undefined')
                    _hmt.push(['_trackPageview', location.pathname + location.search]);
            };
            LC_function();
        });
        lay.pjax.init(50);
    });
};

/* ajax方法 */
var _ajax = function (url, type, datatype, data, cb) {
    type = type ? type : 'GET';
    datatype = datatype ? datatype : 'html';
    data = data ? data : '';
    cb = cb ? cb : function () {};
    $.ajax({
        url: url,
        type: type,
        data: data,
        async: true,
        dataType: datatype,
        success: function (res) {
            cb(res);
        }
    });
};

function LC_function() {

    /*首页ajax翻页*/
    if ($('.ajax_page').length > 0) {
        var ajax_page = function () {
            var page = $('.ajax_page').attr('data-page');
            $('.ajax_page').on('click', function () {
                $('.ajax_page').html('加载中...');
                _ajax('/index.php?ajax=1&page=' + page, '', '', '', function (res) {
                    $('.pager').after(res).remove(); //在类名为pager的DOM结构之后插入返回值，然后删除自身
                    ajax_page(); //递归调用
                });
            });
        };
        ajax_page(); //首次执行
    };

    /*页面loading*/
    lay.layer.load(0, {
        time: 0.5 * 1000,
        shade: [0.2, '#fff']
    });

    /*图片懒加载*/
    if ($('img').length > 0) {
        $('img').each(function () {
            if ($(this).attr('lay-src')) {
                $(this).addClass('imgloading').attr('layer-src', $(this).attr('lay-src'));
            };
        });
        lay.flow.lazyimg({
            elem: 'img'
        });
    };


    /*推荐文章轮播加载*/
    if ($('.comlist').length > 0) {
        var lunbo_comlist = lay.carousel.render({
            elem: '.comlist',
            width: '100%',
            height: '270px',
            arrow: 'always',
            interval: 5000
        });
        $(window).on('resize', function () {
            var lunbo_comlist_h = $('.comlist .layui-this img').height() + 'px';
            lunbo_comlist.config.elem.css('height', lunbo_comlist_h);
        });
    }

    /*处理手机导航问题*/
    if ($('.top-nav').length > 0) {
        var topnav = $('.top-nav');
        // var menu = '<ul class="layui-nav layui-nav-tree layui-nav-side" style="display:none;">' + topnav.children('.layui-nav').html() + '</ul>';
        topnav.children('.open').on('click', function() {
            $(this).hide(0);
            topnav.children('.layui-nav').addClass('layui-nav-tree layui-nav-side').show(200);
            topnav.children('.close').show(0);
        });
        topnav.children('.close').on('click', function() {
            $(this).hide(0);
            topnav.children('.layui-nav').hide(0).removeClass('layui-nav-tree layui-nav-side');
            topnav.children('.open').show(0);
        })
        if (win_width < 1200) {
            $('.layui-nav-item').each(function () {
                if ($(this).children('.layui-nav-child').length > 0) {
                    $(this).children('a').attr('href', 'javascript:;');
                };
            });
        };
    };

    /* ifarme弹窗方法 */
    var layerIframe = function (title,url,w,h,maxmin,scroll) {
        title = title ? title : false;
        url = url ? url : '../error/404.html';
        w = w ? w : 600;
        h = h ? h : win_height - 50;
        maxmin = maxmin ? maxmin : false;
        scroll = scroll ? scroll : 'no';
        var login_index = lay.layer.open({
            type: 2,
            title: title,
            area: [w, h],
            fixed: true,
            maxmin: maxmin,
            content: [url, scroll]
        });
        if (win_width < 1200) {
            lay.layer.full(login_index);
        };
    };

    /*editor.js*/
    /*处理视频播放插件*/
    if ($('.editor .plugin_video').length > 0) {
        $('.editor .plugin_video').each(function () {
            var video = $(this).data();
            var id = String(video.id).split('|');
            var video_w = $('.editor ._content').width();
            var video_h = (video_w / 16) * 9;
            switch (id[0]) {
                case 'qq':
                    if (win_width > 1200) {
                        var html_embed = '<embed src="https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=' + id[1] + '&auto=0" allowFullScreen="true" quality="high" width="100%" height="' + video_h + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>';
                        $(this).html(html_embed);
                    } else {
                        var iframe_url = '//v.qq.com/iframe/player.html?vid=' + id[1] + '&tiny=0&auto=0';
                        var html_iframe = '<iframe frameborder="0" width="100%" height="' + video_h + '" src="' + iframe_url + '" allowfullscreen></iframe>';
                        $(this).html(html_iframe);
                    }
                    ;
                    break;
                case 'youku':
                    var iframe_url = '//player.youku.com/embed/' + id[1];
                    var html_iframe = '<iframe frameborder="0" width="100%" height="' + video_h + '" src="' + iframe_url + '" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
                    $(this).html(html_iframe);
                    break;
                case 'own':
                    var iframe_url = M['tem'] + '/min/static/ckplayer/player.php?video=' + encodeURIComponent(id[1] + '://' + id[2]);
                    var html_iframe = '<iframe frameborder="0" width="100%" height="' + video_h + '" src="' + iframe_url + '" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>';
                    $(this).html(html_iframe);
                    break;
            }
            ;
        });
    };

    /*处理网易云音乐播放器*/
    if ($('.editor .plugin_music163').length > 0) {
        $('.editor .plugin_music163').each(function () {
            var musicid = $(this).data();
            var id = String(musicid.id).split('|');
            id[1] = id[1] ? id[1] : 0;
            $(this).html('<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 src="//music.163.com/outchain/player?type=2&id=' + id[0] + '&auto=' + id[1] + '&height=66"></iframe>');
        });
    };

    if ($('.editor table').length > 0) {
        $('.editor table').each(function () {
            $(this).addClass('layui-table').wrapAll('<div class="_tablebox"></div>');
            $(this).html($(this).html().replace(/<span><\/span>/g, '<br>'));
        });
    };

    if ($('.editor a').length > 0) {
        $('.editor a').attr('target', '_blank');
        $('.editor a').on('click', function () {
            var url = $(this).attr('href');
            if (url.indexOf(window.location.host) < 0) {
                event.preventDefault();
                lay.layer.confirm('您即将访问站外链接，是否立即访问？<br>如无法直接打开，请复制链接地址打开！<br><input type="text" class="layui-input" value="' + url + '">', {
                    title: '友情提示',
                    anim: 0,
                    btnAlign: 'c',
                    btn: ['立即访问', '取消']
                }, function () {
                    window.open(url);
                });
            }
        });
    };

    if ($('.editor pre').length > 0) {
        $(".editor pre").addClass("prettyprint linenums");
        lay.pretty();
    };

    if ($('.editor img').length > 0) {
        $('.editor img').each(function () {
            if ($(this).attr('layer-src') && !$(this).parent().attr("href")) {
                $(this).css({
                    'cursor': 'zoom-in'
                }).wrapAll('<span class="layer-img"></span>');
            }
            ;
        });
        lay.layer.photos({
            photos: '.layer-img',
            anim: 5
        });
    };

    if ($('.met_pager').length > 0) {
        if ($('.PreA').length > 0) {
            $('.PreA').addClass('layui-btn');
        } else {
            $('.PreSpan').addClass('layui-btn layui-btn-disabled');
        }
        ;
        if ($('.NextA').length > 0) {
            $('.NextA').addClass('layui-btn');
        } else {
            $('.NextSpan').addClass('layui-btn layui-btn-disabled');
        };
    };


    $('#login').on('click', function () {
        layerIframe('用户登录', '../login/login_iframe.html', '440', '420',false);
    });

    $('#reg').on('click', function () {
        layerIframe('用户注册', '../login/reg_iframe.html', '440', '420',false);
    });

    $('#admin').on('click', function () {
        layerIframe('管理员登录', '../login/login_admin_iframe.html', '440', '420',false);
    });

    /*在线客服按钮点击事件*/
    $('#onlineChatBtn').on('click', function () {
        windowOpen('http://p.qiao.baidu.com/cps/chat?siteId=11555035&userId=22742801', '', '585', '540')
    });

    /*固定右下角工具*/
    util.fixbar({
        bar1: true
        , bar2: true
        , css: {right: 50, bottom: 100}
        , bgcolor: '#393D49'
        , click: function (type) {
            if (type === 'bar1') {
                openwindow('http://p.qiao.baidu.com/cps/chat?siteId=11555035&userId=22742801', '', '585', '540')
            } else if (type === 'bar2') {
                window.open('../help/help_hall.html')
            } else if (type === 'top') {
                $('html,body').animate({
                    'scrollTop': 0
                }, 500);
            }
        }
    });

    /*pinglun.js*/
    /*if ($('.ajax_pinglun').length > 0) {
        var pid = $('.ajax_pinglun').attr('data-pid');

        function buildpinglun() {
            var btn = $('.pinglun ._btn');
            $('.pinglun ._textarea').attr('id', 'PLTEXT');
            var index = lay.layedit.build('PLTEXT', {
                height: 150,
                tool: ['strong', 'italic', '|', 'left', 'center', 'right', '|', 'face', 'code']
            });
            btn.on('click', function () {
                if (!btn.hasClass('layui-btn-disabled')) {
                    var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    var content = lay.layedit.getContent(index);
                    var email = $('.pinglun ._email').val();
                    if (!content) {
                        lay.layer.msg('请输入评论内容！', {
                            icon: 5,
                            anim: 6
                        });
                        return;
                    }
                    ;
                    if (!emailreg.test(email)) {
                        lay.layer.msg('请输入正确的邮箱地址！', {
                            icon: 5,
                            anim: 6
                        });
                        return;
                    }
                    var postdata = {
                        'pid': pid,
                        'email': email,
                        'content': content,
                        'url': window.location.href
                    };
                    btn.addClass('layui-btn-disabled').text('提交中...');
                    _ajax('/api/xcx_blog/pinglun/add', 'POST', 'json', postdata, function (res) {
                        if (res.code === 0) {
                            ifarme_box('/api/xcx_blog/login/login', '用户登录', '300px', '500px');
                        } else {
                            lay.layer.msg(res.msg);
                        }
                        ;
                        if (res.code === 1) {
                            _ajax('/api/xcx_blog/pinglun/list/pid=' + pid, 'GET', 'html', '', function (res) {
                                $('.pinglun ._body').html(res);
                                buildpinglunlist();
                            });
                        }
                        ;btn.removeClass('layui-btn-disabled').text('立即提交');
                    });
                }
                ;
            });
        };

        function pinglunreply() {
            var btn_reply = $('.pinglun ._btn_reply');
            btn_reply.on('click', function () {
                var tpid = $(this).attr('data-tpid');
                var tid = $(this).attr('data-tid');
                var tuid = $(this).attr('data-tuid');
                _ajax('/api/xcx_blog/pinglun/reply', 'GET', 'html', '', function (res) {
                    var w = '600px';
                    var h = '350px';
                    var openindex = lay.layer.open({
                        type: 1,
                        title: '回复评论',
                        area: [w, h],
                        content: res
                    });
                    if (win_width < 1200) {
                        lay.layer.full(openindex);
                    }
                    ;$('._textarea_reply').attr('id', 'REPLYTEXT');
                    var index = lay.layedit.build('REPLYTEXT', {
                        height: 150,
                        tool: ['strong', 'italic', '|', 'left', 'center', 'right', '|', 'face', 'code']
                    });
                    var btn = $('._btn_reply_tj');
                    btn.on('click', function () {
                        if (!btn.hasClass('layui-btn-disabled')) {
                            var emailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                            var content = lay.layedit.getContent(index);
                            var email = $('._email_reply').val();
                            if (!content) {
                                lay.layer.msg('请输入评论内容！', {
                                    icon: 5,
                                    anim: 6
                                });
                                return;
                            }
                            ;
                            if (!emailreg.test(email)) {
                                lay.layer.msg('请输入正确的邮箱地址！', {
                                    icon: 5,
                                    anim: 6
                                });
                                return;
                            }
                            var postdata = {
                                'pid': pid,
                                'tpid': tpid,
                                'tid': tid,
                                'tuid': tuid,
                                'email': email,
                                'content': content,
                                'url': window.location.href
                            };
                            btn.addClass('layui-btn-disabled').text('提交中...');
                            _ajax('/api/xcx_blog/pinglun/add', 'POST', 'json', postdata, function (res) {
                                if (res.code === 0) {
                                    ifarme_box('/api/xcx_blog/login/login', '用户登录', '300px', '500px');
                                } else {
                                    lay.layer.msg(res.msg);
                                }
                                ;
                                if (res.code === 1) {
                                    _ajax('/api/xcx_blog/pinglun/list/pid=' + pid, 'GET', 'html', '', function (res) {
                                        $('.pinglun ._body').html(res);
                                        buildpinglunlist();
                                        lay.layer.close(openindex);
                                    });
                                }
                                ;btn.removeClass('layui-btn-disabled').text('立即提交');
                            });
                        }
                        ;
                    });
                });
            });
        };

        function buildpinglunlist() {
            if ($('.pinglun pre').length > 0) {
                $('.pinglun pre').each(function () {
                    $(this).html($(this).html().replace(/\n\n/g, "\n \n"));
                });
                lay.code({
                    elem: '.pinglun pre',
                    title: 'Code',
                    about: false
                });
                $('.pinglun pre li').each(function () {
                    $(this).html('<span>' + $(this).html() + '</span>');
                });
            }
            ;pinglunreply();
        }

        _ajax('/api/xcx_blog/pinglun/index', 'GET', 'html', '', function (res) {
            $('.ajax_pinglun').html(res);
            buildpinglun();
            _ajax('/api/xcx_blog/pinglun/list/pid=' + pid, 'GET', 'html', '', function (res) {
                $('.pinglun ._body').html(res);
                buildpinglunlist();
            });
        });
    };*/
};

