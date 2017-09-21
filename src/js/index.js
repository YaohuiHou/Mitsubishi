
    window.onload = function(){
        document.querySelector('#loading').classList.remove('visible')
    };
    var INDEX = 1;
    var carInfo = document.querySelectorAll('#carInfo div'),
        shade7  = document.querySelector('#shade7'),
        wiperSlide7 = document.querySelector('.swiper-slide7');
    carInfo && carInfo.addEventListener('click',function(event){
        var target = event.target;
        shade7.style.display = 'block';
        var img = shade7.querySelector('img');
        img.src = this.dataset['imgurl'];
        wiperSlide7.classList.add('swiper-no-swiping');
    })

    shade7 && shade7.addEventListener('click',function(event){
        shade7.style.display = 'none';
        wiperSlide7.classList.remove('swiper-no-swiping')
    })
    var car_media = document.querySelector('#car_media');
    var swiper_next = document.querySelector('#swiper_next'),
        swiper_right = document.querySelector('#swiper_right');
    var mySwiper1 = new Swiper('#flipview_wrapper',{
        direction : 'vertical',
        nextButton : '#swiper_next',
        onSlideChangeEnd: function(swiper){
            if(swiper.activeIndex == 2){
                document.addEventListener("WeixinJSBridgeReady", autoPlayMusic, false);
                car_media.load();
                car_media.play();
            }else if(swiper.activeIndex == 6){
                if(INDEX != 4){
                    //隐藏向下按钮
                    swiper_next.style.display = 'none';
                    swiper_right.style.display = 'block'
                }else{
                    swiper_next.style.display = 'block'
                    swiper_right.style.display = 'none'
                }
            }else{
                car_media.pause();
                swiper_next.style.display = 'block'
            }
            if(swiper.activeIndex == 4){
                document.addEventListener("WeixinJSBridgeReady", PlayMusic, false);
                bride_media.load();
                bride_media.play();
            }else{
                bride_media.pause();
            }
        }
    });
    var paginationArr = ['第一代帕杰罗','第二代帕杰罗','第三代帕杰罗'];
    var mySwiper2 = new Swiper('.container3',{
        loop:false,
        pagination: '#slide4_pagination',
        paginationClickable: true,
        paginationBulletRender: function(swiper, index, className) {
            var me = this;
            return '<span class="' + me.bulletClass + '">' + paginationArr[swiper] + '</span>';
        },
        onTouchEnd: function(swiper){
            var i = swiper.translate;
            if(i < -1634){
                mySwiper1.slideTo(4, 800, false);
            };
        }
    });
    var mySwiper3 = new Swiper('.container9',{
        loop:false,
        paginationClickable: true,
        nextButton : '#swiper_right',
        onSlideChangeEnd(swiper){
            INDEX = swiper.activeIndex;
            if( INDEX == 4){
                swiper_next.style.display = 'block';
                swiper_right.style.display = 'none';
            }else{
                swiper_next.style.display = 'none';
                swiper_right.style.display = 'block';
            }
        },
    });

    document.addEventListener('touchstart', autoPlayMusic);
    document.addEventListener('touchstart', PlayMusic);

    // ios音乐
    function autoIosPlayMusic() {
        media.load();
        media.play();
        document.removeEventListener('touchstart', autoIosPlayMusic)
    }
    document.addEventListener('touchstart', autoIosPlayMusic);
    document.addEventListener("WeixinJSBridgeReady", autoIosPlayMusic, false);

    media.play();
    document.querySelector('#control').addEventListener('click', function() {
        if (this.className === 'on') {
            this.className = 'off';
            media.pause();
        } else {
            this.className = 'on';
            media.play();
        }
    });


    // 音乐
    function autoPlayMusic() {
        document.removeEventListener("WeixinJSBridgeReady", autoPlayMusic);
        car_media.load();
        car_media.play();
        document.removeEventListener('touchstart', autoPlayMusic);
        car_media.pause();
    };
    function PlayMusic() {
         document.removeEventListener("WeixinJSBridgeReady", PlayMusic);
         bride_media.load();
         bride_media.play();
        document.removeEventListener('touchstart', PlayMusic);
        bride_media.pause();
    };

    // 长图

    // 通知地点
    var swiperSlideLis = document.querySelectorAll('#swiper_slide28 li'),
        swiperSlide10 = document.querySelector('#swiper_slide28'),
        layer_close = document.querySelector('#layer_close'),
        layer_view = document.querySelector('#layer_view');
    swiperSlideLis.addEventListener('click',function(e){
        swiperSlide10.classList.add('swiper-no-swiping')
        var event = e.target;
        layer_view.querySelector('img').src = event.dataset['img'];
        layer_view.style.display = 'block';
    });
    layer_view.addEventListener('click',function(){
        swiperSlide10.classList.remove('swiper-no-swiping')
        layer_view.style.display = 'none';
    });


    // 分享
    $.ajax({
        url: "../../api/wx/getinfo.aspx",
        type: "post",
        data: { "url": escape(document.URL) },
        dataType: "json",
        async: false,
        success: function(data) {
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp, // 生成签名的时间戳
                nonceStr: data.nonceStr, // 生成签名的随机串
                signature: data.signature, // 签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showOptionMenu']
            });
        },
        error: function() {
        }
    });

    wx.ready(function() {
        wx.showOptionMenu();
        wx.onMenuShareTimeline({
            title: WechatShareData.sharetitle,
            link: WechatShareData.link,
            imgUrl: WechatShareData.icon,
            success: function() {
                //DoVote();
            }
        });
        wx.onMenuShareAppMessage({
            title: WechatShareData.title,
            desc: WechatShareData.desc,
            link: WechatShareData.link,
            imgUrl: WechatShareData.icon,
            success: function() {
            }
        });
    });
    wx.error(function(res) {
        console.log(res);
    });

    var WechatShareData = {
        'title': '【寻徽州古韵，探壮美黄山】帕杰罗徽州文化之旅即将启程！',
        'sharetitle': '2018款帕杰罗携2018款欧蓝德，2018款劲炫期待您的到来。',
        'link': location.href,
        'icon': 'http://s.kcimg.cn/wap/images/jac/20170824/share1.jpg',
        'desc': '2018款帕杰罗携2018款欧蓝德，2018款劲炫期待您的到来。'
    };
