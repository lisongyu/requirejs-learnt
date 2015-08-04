/*
* 此处只是为了展示代码的视觉效果，只作为参考
* */
require.config({
    baseUrl: "javascript",
    //packages: ['carousel'],
    paths: {
        jquery: 'lib/jquery.min',
        bootstrap: 'lib/bootstrap'
    }
});
//require(['carousel']);
require(['jquery','bootstrap'], function ($) {

    $('.carousel').carousel({
        interval: 3000
    });
});
//收藏方法
require(['jquery'], function ($) {

    var collect=$('.goodsOffer-collect');
    collect.on('collect',function(){
        if(!collect.hasClass('goodsOffer-collect--bg')){
            collect.addClass('goodsOffer-collect--bg');
            collect.html('已收藏');
        }else{
            collect.removeClass('goodsOffer-collect--bg');
            collect.html('收藏店铺');
        }
    })
    collect.on("click",function(){
        $(this).trigger('collect');
    })
});
//出价控制
require(['jquery','sp-bid-control'], function ($) {

    $(".bidderOffer").spBidControl({
        //步长100
        step : 100,
        //不能点击为false
        isDisabled : false,
        //最大值
        maxVal : 500,
        //最小值
        minVal : 0,
        //当前值
        currVal : 0,
        //可编辑性
        isEdit : false,
        isBtnShow : true,
        //按钮样式
        btnStyle : {
            "btnTxt" : "出价", //我要拍
            "btnCss" : "bidderOffer-btn"
        },
        callbackFn : function(currVal, $element, spBidControl) {
            var $chujiaSubmit = $element.find(".chujia-submit");
            // $chujiaSubmit.off("clik.spBidControl");
            // 不能调用currVal这个值作为出价框数值，会出现出价不成功的情况
            var inputPrice = $(".bidderOffer-text").val();
            console.log(inputPrice);

        }
    });
    setTimeout(function() {
        $(".bidderOffer").spBidControl({
            isDisabled : true,
            btnStyle : {
                "btnTxt" : "已结束", //出价
                "btnCss" : "bidderOffer-btn"
            }
        });

    }, timeParm);
});
//导航菜单的显示隐藏
require(['jquery'], function ($) {

    $('.outletHeader-menu').on(clik,function(){
        $('.menu-content').toggle();
        return false;
    })
    $(document).on(clik,function(){
        $('.menu-content').hide();
    });

    $('.closeme').on(clik,function(){
        $(this).parents('.numtips').hide();
    });
});
//当滚动到一定距离时导航固定
require(['jquery'], function ($) {

    window.addEventListener("scroll", function () {
            //内容实际高度
            var h = document.documentElement.offsetHeight || document.body.offsetHeight,
            //可视区域高度
                iH = window.innerHeight;
            //console.log(h);
            var offTop = $("#tag").offset().top;
            if (window.pageYOffset >= offTop-20) {

                $(".detail_nav_change").animate({
                    "position" : "fixed",
                    "top" : "0",
                    "zIndex":1000
                }, "normal");
                $(".shopDetail-content").css({
                    "position" : "relative",
                    "top" : "1rem",
                    "zIndex":100
                });
            }
            else {
                var changeTop=$(".detail_nav_change").offset().top;
                $(".detail_nav_change").animate({
                    "position" : "relative",
                    "top" : 0
                }, "normal");
//
                $(".shopDetail-content").css({
                    "position" : "relative",
                    "top" : "0",
                    "zIndex":100
                });
            }
        }
    );
});



