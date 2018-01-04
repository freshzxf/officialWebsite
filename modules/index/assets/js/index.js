/**
 index入口
 **/
layui.define(['layer', 'form','element','carousel','util'], function(exports){
    var layer = layui.layer,
        element = layui.element ,
        form = layui.form,
        carousel = layui.carousel,
        util = layui.util;
    //建造banner
    carousel.render({
        elem: '#banner'
        ,width: '100%' //设置容器宽度
        ,height: '470px' //设置容器高度
        ,arrow: 'always' //始终显示箭头
        ,interval: 10000 //始终显示箭头
        //,anim: 'fade' //切换动画方式
    });
    //客户评价
    carousel.render({
        elem: '#customerVoice'
        ,width: '60%' //设置容器宽度
        ,autoplay: true
        ,arrow: 'always' //始终显示箭头
        ,interval: 500000 //始终显示箭头
        ,indicator: 'none' //始终显示箭头
        ,anim: 'default' //切换动画方式
    });
    /*成功案例*/
    successCaseSwiper = new Swiper('#successCase .swiper-container', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 5,
        autoplay: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            //clickable :true,
        },
        on: {
            progress: function(progress) {
                for (i = 0; i < this.slides.length; i++) {
                    var slide = this.slides.eq(i);
                    var slideProgress = this.slides[i].progress;
                    modify = 1;
                    if (Math.abs(slideProgress) > 1) {
                        modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                    }
                    translate = slideProgress * modify * 260 + 'px';
                    scale = 1 - Math.abs(slideProgress) / 5;
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

    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
});
