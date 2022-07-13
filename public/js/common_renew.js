var prevFocus = null;
$(document).ready(function(){
    header_motion(); // header
    quick_motion();
    // link_scroll();



    $(function(){
        //resize: 브라우저 창 너비의 변경된 값을 width 변수에 저장
        $(window).resize(function () {
            var width = $(window).width();
            if (width<=1000) {
                $('#skipNav').remove();
            }
        });

        $(window).trigger("resize"); //강제로 호출하는 함수
    });
    //footer family site
    $('.ft-family-dl').on("click",function(){
        $('.ft-family').toggleClass('active');
        if($('.ft-family').hasClass('active')){
          $(this).attr('title','패밀리 사이트 닫기')
        } else {
          $(this).attr('title','패밀리 사이트 열기')
        }
    });

    $('.mouse-prev, .mouse-next').attr('tabindex',-1);

    $( window ).resize( function() {
      // link_scroll();
    });

    $('.input-delete').on('click',function() {
      $(this).parents('.form-item').find('.input1').val('');
    });

    $('.tit04').focusout(function(){
        $('.tit04').attr('tabindex','-1');
    });



});


function header_motion(){
    var doc = document.documentElement;
    var w = window;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var header = document.getElementById('site-header');
    var site_btn = document.querySelector('.h-sitemap-btn');

    var checkScroll = function() {
        curScroll = w.scrollY || doc.scrollTop;
        if (curScroll > prevScroll) {
          direction = 2;//scrolled up
        }
        else if (curScroll < prevScroll) {
          direction = 1;//scrolled down
        }

        if (direction !== prevDirection) {
          toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
      };

      var toggleHeader = function(direction, curScroll) {
        if (direction === 2 && curScroll > 52) {
          header.classList.add('hide');
          site_btn.classList.add('hide');
          prevDirection = direction;
        }
        else if (direction === 1) {
          header.classList.remove('hide');
          site_btn.classList.remove('hide');
          prevDirection = direction;
        }
      };

      window.addEventListener('scroll', checkScroll);


    // gnb
    $('.subnav').hover(function(){
        $(this).children('.subnav-content').stop().slideDown({duration: 200, easing: "easeInQuad"});
    },function(){
        $(this).children('.subnav-content').hide();
    });

    //gnb-keyboard(접근성)
    $('.h-depth1').bind({
        focusin:function(){
            $('.subnav-content').hide();
            $(this).siblings('.subnav-content').slideDown({duration: 200, easing: "easeInQuad"});
        }
    });
    $('.slide-menu .sub-menu:last-child .h-depth2-inner li:last-child a').focusout(function(){
        $('.subnav-content').hide();
    });


    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
  //header 유틸
    if(isMobile){
        $('.h-icons').on('click',function(){
            if (window.matchMedia('(max-width: 768px)').matches){
                $(this).siblings().children('.h-right-sub').hide();
                $(this).children('.h-right-sub').toggle();
            }else{
                $(this).siblings().children('.h-right-sub').stop().slideUp({duration: 200, easing: "easeInQuad"});
                $(this).children('.h-right-sub').stop().slideToggle({duration: 200, easing: "easeInQuad"});
            }
        });
    }else{
        $('.h-icons').hover(
            function(){
                if (window.matchMedia('(max-width: 768px)').matches){
                    $(this).children('.h-right-sub').show();

                }else{
                    $(this).children('.h-right-sub').stop().slideDown({duration: 200, easing: "easeInQuad"});
                }
            },function(){
                $(this).children('.h-right-sub').hide();

        });

      //header 유틸-keyboard(접근성)
        $('.h-icons button').bind({
            focusin:function(){
                $('.h-right-sub').hide();
                $(this).siblings('.h-right-sub').slideDown({duration: 200, easing: "easeInQuad"});
            }
        });
    }

    $('.h-right-sub li:last-child a').focusout(function(){
        $('.h-right-sub').hide();
    });


    //header 통합검색 열기 닫기
    $('.h-search-btn').on('click',function(){
        $(this).addClass('open');
        $('.search-box').addClass('open');
        $('.search-box').stop().slideDown({duration: 400, easing: "easeInQuad"});
        $('.h-sitemap-btn').hide()
    });

    $('.close-sch-btn').on('click',function(){
        $('.h-search-btn').removeClass('open');
        $('.search-box').removeClass('open');
        $('.search-box').stop().delay(100).slideUp({duration: 400, easing: "easeInQuad"});

        setTimeout(function(){
            $('.h-sitemap-btn').show();
        }, 500);

    });


  //사이트맵
    $('.h-sitemap-btn').on('click',function(){
        
        $('.h-sitemap-btn-close-top').focus();
        $(this).addClass('open');
        $('body').addClass('hidden');
        $('header').addClass('opensitemap');
        $('.sitemap-wrap').addClass('open');
        $('.sitemap-lang').show();
        //$('.h-dropdown').removeClass('left1 , left2');
        $('.sitemap-wrap a , .sitemap-wrap button , .sitemap-lang a , .m-menu button').attr('tabindex', 0);

        // 접근성 속도 오류 setTimeout(function(){
            $('.h-dropdown').addClass('show');
            $('#print_area').addClass('offscreen');
            $('footer').addClass('offscreen');
            $('.quickmenu').addClass('offscreen');
            
            
            if($('.h-sitemap-btn-close').length){
                $('#print_area').removeClass('offscreen');
                $('footer').removeClass('offscreen');
                $('.quickmenu').removeClass('offscreen');
                $('.h-sitemap-btn-close').hide();
                $('.h-sitemap-btn').removeClass('open');
                $('body').removeClass('hidden');
                $('header').removeClass('opensitemap');
                $('.sitemap-wrap').removeClass('open');
                $('.sitemap-lang').hide();
                //$('.h-dropdown').removeClass('left1 , left2 , show');
                $('.sitemap-wrap a , .sitemap-wrap button , .sitemap-lang a ,.m-menu button').attr('tabindex', -1);
                $('.h-sitemap-btn-close').addClass('h-sitemap-btn');
                $('.h-sitemap-btn-close').removeClass('h-sitemap-btn-close');
                $('.h-sitemap-btn').show();
                $('.h-sitemap-btn').attr('title','전체메뉴 열기');
                
                
            }else{
                $('.h-sitemap-btn').addClass('h-sitemap-btn-close'); 
                $('.h-sitemap-btn-close').show();
                $('.h-sitemap-btn').attr('title','전체메뉴 닫기');
            }
            
            
            //$('.h-sitemap-btn').removeClass('h-sitemap-btn');
            
            
        //}, 500);


    });

    $('.h-sitemap-btn-close , .sitemap-depth2 li a').on('click',function(){
        
        $('#print_area').removeClass('offscreen');
        $('footer').removeClass('offscreen');
        $('.quickmenu').removeClass('offscreen');
        $('.h-sitemap-btn-close').hide();
        $('.h-sitemap-btn').removeClass('open');
        $('body').removeClass('hidden');
        $('header').removeClass('opensitemap');
        $('.sitemap-wrap').removeClass('open');
        $('.sitemap-lang').hide();
        //$('.h-dropdown').removeClass('left1 , left2 , show');
        $('.sitemap-wrap a , .sitemap-wrap button , .sitemap-lang a ,.m-menu button').attr('tabindex', -1);
        $('.h-sitemap-btn-close').addClass('h-sitemap-btn');
        $('.h-sitemap-btn-close').removeClass('h-sitemap-btn-close');
        
    });


  $('.sitemap-depth2 > button').on('click',function(){
      $(this).parents('.sitemap-depth2').toggleClass('active');
      if ($(this).parents('.sitemap-depth2').hasClass('active')) {
        $(this).attr('title','서브메뉴 닫기');
      } else {
        $(this).attr('title','서브메뉴 열기');
      }
      $(this).siblings('ul').stop().slideToggle({duration: 400, easing: "easeInQuad"});
  });

  $('.m-menu').on('click',function(){
        $('.h-dropdown').removeClass('left1 , left2');
        $(this).addClass('on');
    });


//  $('.h-notice').on('click',function(){
//      $('.h-dropdown').removeClass('left2');
//      $('.h-dropdown').addClass('left1');
//  });
//

  $('.h-notice').hover(function(){
      $('.h-dropdown').removeClass('left2');
      $('.h-dropdown').addClass('left1');
  },function(){
      $('.h-dropdown').removeClass('left2 ,left1');
  });


//  $('.h-share').on('click',function(){
//      $('.h-dropdown').removeClass('left1');
//      $('.h-dropdown').addClass('left2');
//  });

  $('.h-share').hover(function(){
      $('.h-dropdown').removeClass('left1');
      $('.h-dropdown').addClass('left2');
  },function(){
      $('.h-dropdown').removeClass('left2 ,left1');
  });

}

function quick_motion(){
    //quick 메뉴
    $('.quickmenu ul').hover(function(){
        if (window.matchMedia('(min-width: 769px)').matches){
            $('.quickmenu > ul').stop().animate({'width':'186px'}, 200 , 'easeOutBounce');
        }
    },function(){
        if (window.matchMedia('(min-width: 769px)').matches){
            $('.quickmenu li').removeClass('active');
            $('.quickmenu > ul').stop().animate({'width':'52px'}, 200 , 'easeOutBounce');
            $('.quick_sub_wrap').hide();
            $('.quick-sub-tit').attr('title','이해관계자 시스템 서브메뉴 열기');
        }

    });

    $('.quickmenu ul a').bind({
        focusin:function(){
            $('.quickmenu > ul').animate({'width':'186px'}, 200 , 'easeOutBounce');
        }
    });

    $('.top-btn').focusout(function(){
        $('.quickmenu > ul').animate({'width':'52px'}, 200 , 'easeOutBounce');
        $('.quick_sub_wrap').hide();
        $('.quick-sub-tit').attr('title','이해관계자 시스템 서브메뉴 열기');
    });

    $('.quickmenu > ul > li > a').on("click", function() {
        $(this).parents('li').toggleClass('active');
        if($(this).parents('li').hasClass('active')) {
          $('.quick-sub-tit').attr('title','이해관계자 시스템 서브메뉴 닫기');
        } else {
          $('.quick-sub-tit').attr('title','이해관계자 시스템 서브메뉴 열기');
        }
        $(this).siblings('.quick_sub_wrap').stop().slideToggle();
      });

    $('.quickmenu .as-btn').on('click', function(e) {
        if (window.matchMedia('(max-width: 768px)').matches){
            e.preventDefault();
            $('#as_alert').fadeIn();
            $('.alert-wrap a').attr('tabindex', 0);
        }
    });

    $('.quickmenu .as-close').on('click', function() {
        $('#as_alert').fadeOut();
        $('.alert-wrap a').attr('tabindex', -1);
        return false;
    });

    //top-btn
    $(window).scroll(function() {
        if ($(this).scrollTop() > 600) {
            $('.top-btn').addClass('on');
            $('.quickmenu > ul > li:last').css('bottom','96px');
        } else {
            $('.top-btn').removeClass('on');
            $('.quickmenu > ul > li:last').css('bottom','46px');
        }
    });

    $('.top-btn').on('click' ,function(){
        $('html , body').animate({scrollTop : 0});
        $('.quickmenu li').removeClass('on');
        $('.quickmenu > ul').stop().animate({'width':'52px'}, 200 , 'easeOutBounce');
        $('.quick_sub_wrap').hide();
        $('.quick-sub-tit').attr('title','이해관계자 시스템 서브메뉴 열기');
    });
}

function filechk(data){
    var fileNm = data.value.lastIndexOf('.');
    var filePoint = data.value.substring(fileNm+1,data.length);
    var fileType = filePoint.toLowerCase();
    var userLang = document.documentElement.lang;

    if(fileType == 'pdf' || fileType == 'jpg' || fileType == 'gif' || fileType == 'png' || fileType == 'ppt' || fileType == 'xls' || fileType == 'doc' || fileType == 'pptx' || fileType == 'xlsx' || fileType == 'docx' || fileType == 'hwp' || fileType == 'txt' || fileType == 'zip'){
        var cur = $(".filebox input[type='file']").val().replace('C:\\fakepath\\', '');
        $(".upload-name").val(cur);
        $(".upload-name").addClass('ch-c');
        return;
    }else{
      if (userLang == 'ko') {
        alert('잘못된 파일입니다.');
      } else if (userLang == 'en') {
        alert('The file is not valid.');
      } else if (userLang == 'cn') {
        alert('文件不正确。');
      }
        var parentObj = data.parentNode;
        node = parentObj.replaceChild(data.cloneNode(true),data);
        return false;
    }
}

function savePDF(pdfArea, pdfFileNm){
  var height = 0;
  if($(pdfArea).find('.layer-head').length > 0){
      height = $(pdfArea).find('.layer-body').outerHeight(true)+$(pdfArea).find('.layer-head').outerHeight(true);
  }else{
      height = $(pdfArea).find('.detial-h').outerHeight(true)+$(pdfArea).find('.detail-body').outerHeight(true)+$(pdfArea).find('.detail-ft').outerHeight(true);
  }

  //태그 비활성
  if($(pdfArea).find('.pdfHiddenTag').length > 0) $(pdfArea).find('.pdfHiddenTag').hide();

  //저장 영역 div id
  html2canvas(pdfArea ,{
    //logging : true,     // 디버그 목적 로그
    //proxy: "html2canvasproxy.php",
    width: $(pdfArea).outerWidth(true),
    height: height,
    allowTaint: true,    // cross-origin allow
    useCORS: true,        // CORS 사용한 서버로부터 이미지 로드할 것인지 여부
    scale: 2         // 기본 96dpi에서 해상도를 두 배로 증가

  }).then(function(canvas) {
    // 캔버스를 이미지로 변환
    var imgData = canvas.toDataURL('image/png');

    var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
    var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
    var imgHeight = canvas.height * imgWidth / canvas.width - 10;
    var heightLeft = imgHeight;
    var margin = 10; // 출력 페이지 여백설정
    var doc = new jsPDF('p', 'mm');
    var position = 0;

    // 첫 페이지 출력
    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // 한 페이지 이상일 경우 루프 돌면서 출력
    while (heightLeft >= 20) {            // 35
    position = heightLeft - imgHeight;
    position = position - 20 ;        // -25

    doc.addPage();
    doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    }

    // 파일 저장
    doc.save(pdfFileNm + '.pdf');

    //태그 활성
    if($(pdfArea).find('.pdfHiddenTag').length > 0) $(pdfArea).find('.pdfHiddenTag').fadeIn('fast');
    $('.progress_mask').css('display', 'none');
    document.getElementById("viewportMeta").setAttribute("content", vp);
  });
}

function googleMap(elemId, mTitle, mAddr, mTel){
    var map = new google.maps.Map(document.getElementById(elemId), {
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var size_x = 40; // 마커로 사용할 이미지의 가로 크기
    var size_y = 40; // 마커로 사용할 이미지의 세로 크기

    // 마커로 사용할 이미지 주소
    var image = new google.maps.MarkerImage( '', // 이미지 파일 url
        new google.maps.Size(size_x, size_y),
        '',
        '',
        new google.maps.Size(size_x, size_y)
    );

    var marker = null;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': mAddr}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            marker = new google.maps.Marker({
                map: map,
                //icon: image, // 마커로 사용할 이미지(변수)
                title: mTitle, // 마커에 마우스 포인트를 갖다댔을 때 뜨는 타이틀
                position: results[0].geometry.location
            });

            var content = mAddr+"<br/><br/>Tel: "+mTel; // 말풍선 안에 들어갈 내용

            // 마커를 클릭했을 때의 이벤트. 말풍선
            var infowindow = new google.maps.InfoWindow({ content: content});
            google.maps.event.addListener(marker, "click", function() {infowindow.open(map,marker);});

            // 프로그레스바 비활성
            $('.progress_mask').css('display', 'none');
        } else {
            // 프로그레스바 비활성
            $('.progress_mask').css('display', 'none');

            //alert("구글지도 오류 : " + status);
        }
    });
}

function kakaoMap(elemId, mTitle, mAddr, mTel){
    var container = document.getElementById(elemId);
    var options = {
        //center: new kakao.maps.LatLng(37.49252776514698, 127.04020515108806),
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3
    };

    var map = new kakao.maps.Map(container, options);
    var geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(mAddr, function(result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            var imageSrc = '/resources/img/renew/content/ico-marker.svg',
            imageSize = new kakao.maps.Size(37,56),
            imageOption = {offset: new kakao.maps.Point(27, 69)};

            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
            , markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

            var marker = new kakao.maps.Marker({
                position: coords,
                image: markerImage
            });

            marker.setMap(map);

            // var content = '<div>' + mTitle + '<br/>'+ mTel + '</div>';

            var content = '<div class="customoverlay text-c">' +
            '    <span class="txt02">'+mTitle+'</span>' +
            '    <span class="txt02">'+mTel+'</span>' +
            '</div>';

            // var infowindow = new kakao.maps.InfoWindow({
            //     position: new kakao.maps.LatLng(33.450701, 126.570667),
            //     content: content
            // });

            var customOverlay = new kakao.maps.CustomOverlay({
                map: map,
                position: coords,
                yAnchor: 1,
                // position: new kakao.maps.LatLng(33.450701, 126.570667),
                content: content
            });

            customOverlay.setMap(null);

            kakao.maps.event.addListener(marker, 'click', function() {
              customOverlay.setMap(map);
            });

            // kakao.maps.event.addListener(marker, 'click', function(mouseEvent) {customOverlay.open(map, marker);});

            map.setLevel(5);
            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.panTo(coords);


        }
    });

    $('.progress_mask').css('display', 'none');
}

var isAuthCaptcha = false;
function fnCaptchaSound(){
    if (!isAuthCaptcha)
    {
        isAuthCaptcha = true;
        var uAgent = navigator.userAgent;
        var soundUrl = "/audio?";

        if (uAgent.indexOf("Trident") > -1 || uAgent.indexOf("MSIE") > -1)
        {
            winPlayer(soundUrl + "agent=" + new Date().getTime());
        }
        else if (!!document.createElement("audio").canPlayType)
        {
            try { new Audio(soundUrl).play(); } catch(e) { winPlayer(soundUrl); }
        }
        else
        {
            window.open(soundUrl, "", "width=1,height=1");
        }

        setTimeout(function(){
            isAuthCaptcha = false;
        }, 4000);
    }
}

function winPlayer(objUrl){
    $("#audioCatpch").html("<bgsound src='" + objUrl + "'>");
}

//레이어 팝업
function layer_popup(el) {
    var $el = $(el);
    var isDim = $el.prev().hasClass('dimBg');
    isDim ? $('.dim-layer').fadeIn() : $el.fadeIn();
    $('.dim-layer a').attr('tabindex', 0);
    $('body').addClass('hidden');

    $el.find('a.btn-layerClose').click(function() {
      isDim ? $('.dim-layer').fadeOut() : $el.fadeOut();
      $('.dim-layer a').attr('tabindex', -1);
      $('body').removeClass('hidden');
      if(prevFocus != null) {
          prevFocus.focus();
          prevFocus = null;
      }
      return false;
    });

    $('.dimBg').click(function() {
      $('.dim-layer').fadeOut();
      $('.dim-layer a').attr('tabindex', -1);
      $('body').removeClass('hidden');

      return false;
    });
}

function fnPdfDownload(obj){
    var $obj = $(obj);

    $.ajax({
        type : 'post',
        async : false,
        url : '/cmm/fms/getRealFile.ajax',
        data : {
              atchFileId : $obj.attr("file-id")
            , fileSeq : $obj.attr("file-sn")
            ,csrfPreventionSalt : $obj.attr("csrfPreventionSalt")
            ,fileNm : $obj.attr("fileNm")
        },
        success : function(r){
            var src = r.rtnMap.saveFileNm; // r.phyPath
            var fileSn = r.rtnMap.fileSeq;
            var fileSize = r.rtnMap.fileSize;
            var fileNm = r.rtnMap.realFileNm;
            var userLang = document.documentElement.lang;

            if (src == '99'){
              if (userLang == 'ko') {
               alert('잘못된 요청입니다.');
             } else if (userLang == 'en') {
               alert("It's a wrong request.");
             } else if (userLang == 'cn') {
               alert('这是错误的请求。');
             }

            }else{
                if(fileSize >= '10485760'){ // 10MB 이상
                    window.open('about:blank').location.href=src;
                }else{
                    var x=new XMLHttpRequest();
                    x.open("GET", src, true);
                    x.responseType = 'blob';
                    x.onload=function(e){download(x.response, fileNm, "" ); }
                    x.send();
                }
            }
        },
         error: function (r){
            alert("error");
        }
    });
}

// 링크 이동 스크롤 조정
function link_scroll() {
  // 페이지가 새로 리로드 될때만 실행
  var hash = window.location.hash;
  if(hash && document.getElementById(hash.slice(1))) {
    var $this = $(hash);

    if(window.matchMedia('(min-width:960px)').matches) {
      $('html, body').animate({
        scrollTop: $this.offset().top + 165
      }, function() {
        window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
      });
    } else {
      $('html, body').animate({
        scrollTop: $this.offset().top + 200
      }, function() {
        window.history.pushState ? window.history.pushState(null, null, hash) : window.location.hash = hash;
      })
    }
  }

}

//페이지 프린트
function printDiv(divName) {
    var data=document.getElementById(divName).innerHTML;
    var myWindow = window.open('', 'my div', 'height=400,width=600');
    var userLang = document.documentElement.lang;
    var currLang = "";

    if (userLang == 'ko') {
      currLang == '현대모비스';
    } else if (userLang == 'en') {
      currLang = 'Hyundai Mobis';
    } else if (userLang == 'cn') {
      currLang = '现代摩比斯';
    }

    myWindow.document.write('<html><head><title>'+currLang+'</title>');
    myWindow.document.write('<link rel="stylesheet" href="/resources/css/common_re.css" type="text/css" />');
    myWindow.document.write('</head><body>');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close();
    myWindow.onload=function(){
        myWindow.focus();
        myWindow.print();
        myWindow.close();
    };

}
