var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(document).ready(function() {
    main_media();


    $(window).resize(function() {
        main_media();

        // main-live-bg
        var live_bg = $('.main-live-wrap').outerHeight();
        $('.main-live-bg').css('height', live_bg);

        // $('.slick-dots button').attr('tabIndex', -1);
    });

    $('#main header , #main .h-sitemap-btn').addClass('main-header');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 90) {
            $('#main header , #main .h-sitemap-btn').removeClass('main-header');
        } else {
            $('#main header , #main .h-sitemap-btn').addClass('main-header');
        }
    });

    gsap.to(".quickmenu", {
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            endTrigger : ".main-sec01-btCon",
            end: "43% 30%",
            //markers:true,
            onEnter: function() {
                $('.quickmenu').addClass('color')
            },
            onEnterBack: function() {
                $('.quickmenu').addClass('color')
            },
            onLeave: function() {
                $('.quickmenu').removeClass('color')
            },
        }
    });

    $('.gnb-wrap').hover(function(){
        $('#main').addClass('gnb-hover')

    },function(){
        $('#main').removeClass('gnb-hover')

    });


    //var $status = $('.slick-num.total');
    var $slickElement = $('.slick-wrap');

    $slickElement.on('init reInit', function(event, slick) {
        if (slick.slideCount <= 9) {
            $(this).find('.slick-num.total').text('0' + slick.slideCount);
        } else {
            $(this).find('.slick-num.total').text(slick.slideCount);
        }
    });

    //자동재생 멈춤 관련
    $('.play').on('click', function() {
        $(this).hide();
        $(this).attr('tabindex', -1);
        $(this).siblings('.pause').show().attr('tabindex', 0).focus();
    });

    $('.pause').on('click', function() {
        $(this).hide();
        $(this).attr('tabindex', -1);
        $(this).siblings('.play').show().attr('tabindex', 0).focus();
    });

    //main visual 영역
    $('.main-visual-slider').slick({
        dots: true,
        appendDots: $('.main-visual-pagination'),
        autoplay: true,
        autoplaySpeed: 6000,
        infinite: true,
         pauseOnHover: false,
         pauseOnFocus: false,
        // speed: 1000,
        slidesToShow: 1,
        accessibility: isMobile,
        prevArrow: $('.prev-visual'),
        nextArrow: $('.next-visual'),
        customPaging: function(slick,index) {
            // return '<span class="circle_wrap" data-anim="base wrapper"><span class="circle-line"></span><span class="circle" data-anim="base left"></span><span class="circle" data-anim="base right"></span></span>';
            return '<div class="circle_wrap"><div class="circle-line"></div><div class="circle circle1"><span class="circle-inner"></span></div><div class="circle circle2"><span class="circle-inner"></span></div></div>'
        }
    });

    $('.play-visual').on('click', function() {
        $('.main-visual-slider').slick('slickPlay');
    });
    $('.pause-visual').on('click', function() {
        $('.main-visual-slider').slick('slickPause');
    });

    //main02 뉴스영역 접근성
    $('.main-news-slider').slick({
        dots: true,
        appendDots: $('.main-news-pagination'),
        autoplay: false,
        autoplaySpeed: 6000,
        infinite: false,
        speed: 1000,
        slidesToShow: 1,
        accessibility: isMobile,
        //fade: true,
        prevArrow: $('.prev-news'),
        nextArrow: $('.next-news'),
        //focusOnChange:true,
    });

    $('.play-news').on('click', function() {
        $('.main-news-slider').slick('slickPlay');
    });

    $('.pause-news').on('click', function() {
        $('.main-news-slider').slick('slickPause');
    });

    //main04 채용
    $('.main-recruit-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        accessibility: isMobile,
        prevArrow: $('.prev-recruit , .mouse-prev-recruit'),
        nextArrow: $('.next-recruit , .mouse-next-recruit'),
        responsive: [{
            breakpoint: 768,
            settings: {
                variableWidth: false,
            }
        }, ]
    });

    var $slider = $('.main-recruit-slider');
    var $progressBar = $('.scrollbar');

    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        var calc = ((nextSlide) / (slick.slideCount - 1)) * 100;
        $progressBar
            .css('background-size', calc + '% 100%')
            .attr('aria-valuenow', calc);
    });

    if (!isMobile) {
        $('.main-visual-slider').find('div').each(function(index, item) {
            $(this).attr('tabindex', "-1");
        });
        $('.main-news-slider').find('div').each(function(index, item) {
            $(this).attr('tabindex', "-1");
        });
        $('.main-recruit-slider').find('div').each(function(index, item) {
            $(this).attr('tabindex', "-1");
        });
    }


    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".main-motion").forEach(function(elem) {
        /* 접근성
        hide(elem);

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function() {
                animateFrom(elem)
            },
            onEnterBack: function() {
                animateFrom(elem, -1)
            },
            onLeave: function() {
                hide(elem)
            }
        });*/
    });


});

//반응형 접근성 관련
function main_media() {
  var userLang = document.documentElement.lang;

    if (window.matchMedia('(max-width: 768px)').matches) {
        $('.main-recruit-slick-control button').attr('tabindex', -1);
        $('.main-live-slick-control .prev  , .main-live-slick-control .next').attr('tabindex', -1);
        $('.main-live-wrap .left').removeClass('main-motion-fromLeft');
        $('.main-live-wrap .right').removeClass('main-motion-fromRight');
        $('.news-slick-wrap').removeClass('slick-control-w');
        $('.main-news-slick-control .prev  , .main-news-slick-control .next').attr('tabindex', -1);
        $('.motion-wrap2').attr('tabindex', -1);
    } else {
      if (userLang == 'ko') {
        $('.news-slick-wrap').addClass('slick-control-w');
      }
        $('.main-recruit-slick-control button').attr('tabindex', 0);
        $('.main-live-slick-control .prev  , .main-live-slick-control .next').attr('tabindex', 0);
        $('.main-live-wrap .left').addClass('main-motion-fromLeft');
        $('.main-live-wrap .right').addClass('main-motion-fromRight');
        $('.main-news-slick-control .prev  , .main-news-slick-control .next').attr('tabindex', 0);
        $('.motion-wrap2').attr('tabindex', 0);
    }
}


//메인 공통 motion
function animateFrom(elem, direction) {
    direction = direction || 1;
    var x = 0,
        y = direction * 200;
    if (elem.classList.contains("main-motion-fromLeft")) {
        x = -200;
        y = 0;
    } else if (elem.classList.contains("main-motion-fromRight")) {
        x = 200;
        y = 0;
    }
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, {
        x: x,
        y: y,
        autoAlpha: 0
    }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, {
        autoAlpha: 0
    });
}

/*
document.addEventListener("DOMContentLoaded", function() {

});
*/

$.each(mouseEffect);

function mouseEffect(obj, e) {
    if ($(window).width() >= 1300) {
        let mouseCursor = $(obj).find('.cursor-left');
        let mouseCursor2 = $(obj).find('.cursor-right');

        var x = e.offsetX;
        var y = e.offsetY;
        mouseCursor.css('left', x);
        mouseCursor.css('top', y);
        mouseCursor2.css('left', x);
        mouseCursor2.css('top', y);
    }
}

function fnMobislive() {
    //main03 live 접근성
    $('.main-live-slider').slick({
        dots: true,
        autoplay: false,
        autoplaySpeed: 2000,
        appendDots: $('.main-live-pagination'),
        infinite: false,
        speed: 300,
        slidesToShow: 1,
        centerMode: false,
        variableWidth: true,
        accessibility: isMobile,
        prevArrow: $('.prev-live'),
        nextArrow: $('.next-live'),
        responsive: [{
            breakpoint: 768,
            settings: {
                variableWidth: false,
                appendDots: $('.main-live-pagination-m'),
            }
        }, ]
    });

    if (!isMobile) {
        $('.main-live-slider').find('div').each(function(index, item) {
            $(this).attr('tabindex', "-1");
        });
    }

    $('.play-live').on('click', function() {
        $('.main-live-slider').slick('slickPlay');
    });

    $('.pause-live').on('click', function() {
        $('.main-live-slider').slick('slickPause');
    });

    var live_bg = $('.main-live-wrap').outerHeight();
    $('.main-live-bg').css('height', live_bg);
}

function fnMobisSus() {
    //main05 지속가능경영
    gsap.to(".main-sus-bg .fixed-bg-wrap", {
        scrollTrigger: {
            trigger: ".main-sus-bg .fixed-bg-wrap",
            start: "top top",
            endTrigger: ".main-sus-text",
            end: "bottom bottom",
            scrub: 1,
            pin: true,
            onUpdate: function() {

            },
        },
    });

    gsap.to(".main-sus-bg .fixed-bg", {
        scrollTrigger: {
            trigger: ".main-sus-bg",
            start: "top 80%",
            end: "+=90%",
            scrub: 1,
            onUpdate: function(self) {
                gsap.to($(".main-sus-bg .fixed-bg"), 1, {
                    width: 40 + (self.progress.toFixed(3) * 60) + "%",
                    ease: Power4.easeOut
                });
            },
        },

    });
}

//메인 팝업 스크립트

// 닫기 버튼 클릭 스크립트
function popupexit(e){
  var this_pop = $(e).parents('.layer-wrap');

  //닫기 버튼 클릭 시 checkbox 체크
  if(this_pop.find('input[name=layer_close]').is(":checked") == true){
      setCookie(this_pop.find('input[name=layer_close]').attr('id'),"Y",1);
  }

  if ($('#notiPop .layer-wrap:visible').length >= 2) {
    this_pop.fadeOut();
    $('.'+this_pop).find('a').attr('tabindex', -1);
  } else {
    $('#notiPop').fadeOut();
    $('body').removeClass('hidden');
    $('.main-popup a').attr('tabindex', -1);
  }
}

/*function popupexit2(){
    setCookie("close","Y",1);
}*/

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000)); //시간설정
    var expires = "expires="+d.toUTCString();
    var temp = cname + "=" + cvalue + "; " + expires;
    document.cookie = temp;
}
