/**
 index入口
 **/
layui.define(['layer', 'form','element','carousel','util'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        form = layui.form,
        carousel = layui.carousel,
        util = layui.util;


    /*大轮播加载*/
    if ($('.banner').length > 0) {
        var lunbo_banner = carousel.render({
            elem: '.banner',
            width: '100%',
            height: $('.banner').attr('data-h'),
            interval: 500000,
            anim: 'fade'
        });
    };

    //客户评价
    carousel.render({
        elem: '#customerVoice'
        ,width: '60%' //设置容器宽度
        ,autoplay: true
        ,arrow: 'always' //始终显示箭头
        ,interval: 5000 //始终显示箭头
        ,indicator: 'none' //始终显示箭头
        ,anim: 'default' //切换动画方式
    });
    /*成功案例*/
    customerSwiper = new Swiper('#customer .swiper-container', {
        watchSlidesProgress: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 7,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        slideToClickedSlide:true,
        on: {
            /*
            *对于slide的progress属性，活动的那个为0，其他的依次减1。例：如果一共有6个slide，活动的是第三个，从第一个到第六个的progress属性分别是：2、1、0、-1、-2、-3;
            对于swiper的progress属性，活动的slide在最左（上）边时为0，活动的slide在最右（下）边时为1，其他情况平分。例：有6个slide，当活动的是第三个时swiper的progress属性是0.4，当活动的是第五个时swiper的progress属性是0.8。
            swiper的progress其实就是wrapper的translate值的百分值，与activeIndex等属性不同，progress是随着swiper的切换而不停的变化，而不是在某个时间点突变。*
            */
            progress: function(progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    /*if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }*/
                    translate = slideProgress * modify * 920 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 4.2;
                    zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                    slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                    slide.css('zIndex', zIndex);
                    slide.css('opacity', 1);
                    if (Math.abs(slideProgress) > 3) {
                        slide.css('opacity', 0);
                    }
                }
            },
            setTransition: function(transition) {
                for (var i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i)
                    slide.transition(transition);
                }

            }
        }
    });
    $('#customer .swiper-slide').hover( function(event){
        customerSwiper.autoplay.stop();
    }, function(event){
        customerSwiper.autoplay.start();
    } );
    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
