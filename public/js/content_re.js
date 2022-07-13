$(document).ready(function(){
    subvisual_motion();
    //filter_motion();
    pc_asidefocus();
    tab_index();
    tab_menu();
    tab_scroll();
    depth2_act();

    //스크롤 이벤트 관련
    $(window).scroll(function(){
        depth_top();
        scroll_active();
        if (window.matchMedia('(max-width: 960px)').matches){
            left_scroll();
        }
    });


    $(window).resize(function() {
        tab_index();
        tab_scroll();
        depth2_act();
    });


  //레이어 팝업
    $('.btn-layer').click(function() {
        prevFocus = $(this);
        var $href = $(this).attr('href');
        layer_popup($href);
    });


    //토글
    $('.toggle-h').on('click' , function(){
       $(this).parents('.toggle-content').toggleClass('active');
       if ($(this).parents('.toggle-content').hasClass('active')) {
         $(this).attr('title','상세닫기');
       } else {
         $(this).attr('title','상세보기');
       }
       $(this).siblings('.toggle-b').slideToggle({duration: 400, easing: "easeInQuad"});
    });

    //서브 페이지 슬라이더 공통
    $('.slick-current').next('').addClass('opacity');

    var $status = $('.slick-num.total');
    var $slickElement = $('.slick-wrap');

    $slickElement.on('init reInit', function (event, slick) {
        if (slick.slideCount <= 9) {
            $status.text('0' + slick.slideCount);
        }else{
            $status.text(slick.slideCount);
        }
    });


    // 모바일 메뉴 좌우 스크롤
    $('.aside-nav a').on('click', function() {
        if($(this.hash).length < 1) return;
        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 100 ,function(){
            left_scroll();
        });
        return false;
    });

    $('.sitemap-depth2 li a').on('click', function() {
        if($(this.hash).length < 1) return;
        $('html, body').animate({scrollTop: $(this.hash).offset().top}, 100 ,function(){
            left_scroll();
        });
        return false;
    });

    //모바일 드롭다운
    $('.m-tab-depth1').attr('title','탭 메뉴 열기')

    $('.m-tab-depth1').on('click',function(){
        $(this).toggleClass('active');
        if($(this).hasClass('active')) {
          $('.m-tab-depth1').attr('title','탭 메뉴 닫기')
        } else {
            $('.m-tab-depth1').attr('title','탭 메뉴 열기')
        }
    });
    
    
    /*---- 접근성 선택됨 수정 ---- $('.tab-depth1 li.active button , .tab-depth1 li.active a').attr('title','선택됨')
    $('.tab-depth1 button , .tab-depth1 a').on('click',function(){
        $('.m-tab-depth1').removeClass('active');
        $('.tab-depth1 button , .tab-depth1 a').attr('title','')
        $(this).parents('li').siblings('li').removeClass('active');
        $(this).parents('li').addClass('active');
        if($(this).parents('li').hasClass('active')){
            $(this).attr('title','선택됨')
        }
    })
    
    
    
     $('.tab-depth2 button , .tab-depth2 a').on('click',function(){
         $('.tab-depth2 button , .tab-depth2 a').attr('title','')
         $(this).parents('li').siblings('li').removeClass('active');
         $(this).parents('li').addClass('active');
         if($(this).parents('li').hasClass('active')){
             $(this).attr('title','선택됨')
         }
    })*/
    
    
    
        $('.tab-depth1 button , .tab-depth1 a').on('click',function(){
        $('.m-tab-depth1').removeClass('active');
    })

     
     $('.tab-depth2 button , .tab-depth2 a').on('click',function(){
         $(this).parents('li').siblings('li').removeClass('active');
         $(this).parents('li').addClass('active');
    })
    
    
    

    //tab 텍스트 변경
    $('.tab-depth1 button').on('click',function(){
        var tab_depth1_text = $(this).text()
        $(this).parents('.tab-wrap').find('.m-tab-depth1 span').text(tab_depth1_text)
    });

    //드롭다운
    $('.dropt').on('click', function() {
        $(this).siblings('.droplist').slideToggle();
        $(this).toggleClass('active');
    });

    $('.droplist button').on('click', function() {
        var drop_text = $(this).text();
        $(this).parents('.dropdown').find('.dropt').addClass('text');
        $(this).parents('.dropdown').find('.dropt').text(drop_text);
        $(this).parents('.droplist').stop().slideUp();
        $(this).parents('li').addClass('on');
        $(this).parents('li').siblings('li').removeClass('on');
    });


    $('.dropt2').on('click', function() {
        $(this).parents('dl').find('.droplist2').slideToggle();
        $(this).parents('dl').find('a').attr('tabindex', 0);
        $(this).parents('li').siblings('li').find('.droplist2').hide();
        $(this).toggleClass('active');
        $(this).parents('li').siblings('li').find('.dropt2').removeClass('active');
    });




        $("#global-aside00>li>a").click(function (key) {

                $('.global-filter').attr('tabindex','0').focus();
                $('.global-filter').focusout(function(){
                    $('.global-filter').attr('tabindex','-1');
                });
        });




});



//서브비주얼 모션 관련
function subvisual_motion(){

  if($('.sub-visual').length > 0 ) {
    gsap.to(".sub-visual", {
      scrollTrigger: {
        trigger: "body",
        start: "50px top",
        endTrigger : ".page-title",
        end: "top top",
        //markers:true,
        onUpdate: function(self){
          // gsap.to($(".sub-visual"), 1, {height:60 + (self.progress.toFixed(3) * 20) + "vh", ease:Expo.easeOut});
          gsap.to($(".sub-visual-img"), 1, {height:60 + (self.progress.toFixed(3) * 10) + "vh", ease:Expo.easeOut});
        },
      },
    });

  }


}
/*

//필터 버튼 모션
function filter_motion(){
    $('.filter-list button').on('click',function(){
        $(this).toggleClass('active');
    })
}
*/

//스트롤 시  메뉴 고정
function depth_top(){

    var window_h = $(this).scrollTop(),
        hh = $('header').outerHeight(),
        page_tit_h = $('.page-title').outerHeight(),
        depth2_h = $('.depth2-nav').outerHeight(),
        depth2_fixed = page_tit_h - depth2_h + hh;

    if ($(".depth2-nav").length > 0) {
        if (depth2_fixed <= window_h) {
            $(".depth2-pos").addClass("fixed");
            $('.content-wrap').css('padding-top' , depth2_h);
            } else {
                $(".depth2-pos").removeClass("fixed");
                $('.content-wrap').css('padding-top' , 0);
            }
    }

    if ($(".aside-nav").length > 0) {
        var right_pos = $('.content').offset().top,
            aside_pos = $('.aside-nav-top').offset().top,
            aside_h = $('.aside-nav-top').outerHeight();
            nav_pos = $('.aside-nav').offset().top,
            nav_h = $('.aside-nav').outerHeight();

        if (right_pos <= window_h) {
            $('.aside-nav').addClass('fixed');
            $('.aside-nav-top').addClass('fixed');
        }else{
            $('.aside-nav').removeClass('fixed');
            $('.aside-nav-top').removeClass('fixed');
        }
    }

}

// pc 메뉴 focus
function pc_asidefocus(){
    $('.aside-nav a').on('click',function(){
        if (window.matchMedia('(min-width: 961px)').matches){
            var nav_href = $(this).attr('href');
            if(document.getElementById(nav_href) == null) return;
            document.getElementById(nav_href).focus();
        }
        // var currLink = $(this).attr('href');
        // currLink.focus();
    })

}



// 모바일 메뉴 좌우 스크롤
function left_scroll(){
    /*
     * 웹접근성
    if($(".aside-nav").length > 0){
        $('.aside-nav').scrollLeft(
            $('.aside-nav li.active').offset().left - $('.aside-nav').offset().left + $('.aside-nav').scrollLeft()-20
    );
    return false;

    }
    */
}

function depth2_act() {
  if($('.depth2-nav').length > 0 ){
    $('.depth2-nav').scrollLeft($('.depth2-nav li.on').offset().left - $('.depth2-nav').offset().left + $('.depth2-nav').scrollLeft()-20);
  }
}



//스크롤 시 메뉴 active
function scroll_active(){
    var sec_pos = $('.sec-wrap'),
        depth2_h = $('.depth2-nav').outerHeight(),
        window_h = $(this).scrollTop();

    $.each(sec_pos, function(idx, item){
        var target = sec_pos.eq(idx),
            i = target.index(),
            targetTop = target.offset().top - 20;

        if (targetTop < window_h) {
            $('.aside-nav').not('.global-aside').find('li').removeClass('active');
            $('.aside-nav').not('.global-aside').find('li').eq(idx).addClass('active');
        }
    });

}

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

//모바일 pc 이미지 변경
function change_img() {
    var width = window.innerWidth || document.documentElement.clientWidth;
    $(".responsive-img img").each(function() {
      var oldSrc = $(this).attr('src');
      if (width > 768) {
        var newSrc = oldSrc.replace('_m', '_pc');
      } else {
        var newSrc = oldSrc.replace('_pc', '_m');
      }
      $(this).attr('src', newSrc);
    });
  }


//tab메뉴 tabindex 변경
function tab_index(){
    if (window.matchMedia('(max-width: 768px)').matches){
        $('.m-tab-depth1').attr('tabindex','0');
    }else{
        $('.m-tab-depth1').attr('tabindex','-1');
        $('.m-tab-depth1').removeClass('active');
    }
}
//tab메뉴 스크롤
function tab_scroll(){
    $('.tab-depth2-scroll').each(function() {
        var sec_w = $('.sec-wrap').width(),
            tab_w = $('.tab-depth2').width(),
            tW = 0;

        $('.tab-depth2 li').each(function(){
            tW += $(this).outerWidth(true);
        });

        if(tW >= sec_w){
            $('.tab-depth2-control').show();
        }else{
            $('.tab-depth2-control').hide();
        }

        $('.tab-depth2-next').on('click',function(){
            $(".tab-depth2").animate({scrollLeft: "+=200px"},0);
        });

        $('.tab-depth2-prev').on('click',function(){
            $(".tab-depth2").animate({scrollLeft: "-=200px"},0);
        });
    });
}

//tab메뉴관련
function tab_menu(){


    const tabGroups = document.querySelectorAll('[data-role="tab"]');
    if (tabGroups) {
      let currentTarget, targetTabWrap, targetTabListWrap, targetPanelWrap;
      // 이벤트 타겟 변수 설정
      const init = (e) => {
        currentTarget = e.target.tagName;
        currentTarget === 'BUTTON' || 'A' ? currentTarget = e.target : currentTarget = e.target.closest('button') || e.target.closest('a');
        targetTabWrap = currentTarget.closest('[data-role="tab"]');
        targetTabListWrap = targetTabWrap.querySelector('[role="tablist"]');
        targetPanelWrap = targetTabWrap.querySelector('.tab-contents');
        //currentTargetText = currentTarget.innerText;
        //mtargetbtn = document.querySelector('.m-tab-depth1 span');
      };
      // 클릭 이벤트
      const tabClickEvt = (e) => {
        init(e);
        if (currentTarget.ariaSelected === 'false') {
          // 미선택된 탭 속성 false 상태로 만들기
          tabRemoveEvt(targetTabListWrap, targetPanelWrap);
          // 선택 된 탭 속성 true 상태로 만들기
          tabAddEvt(currentTarget, targetTabWrap);
          //mtargetbtn.innerText = currentTargetText;
        };
      };
      // 키보드 접근 이벤트
      const tabKeyUpEvt = (e) => {
        init(e);
        const targetBtnWrap = currentTarget.parentElement;
        if (e.key == 'ArrowRight') {
          // 키보드 -> 화살표를 눌렀을 때
          if (targetBtnWrap.nextElementSibling) {
            targetBtnWrap.nextElementSibling.children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetPanelWrap);
            tabAddEvt(targetBtnWrap.nextElementSibling.children[0], targetTabWrap);
            $(targetBtnWrap.nextElementSibling.children[0]).trigger('click');
            //mtargetbtn.innerText = currentTargetText;
          }
          else homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
        } else if (e.key == 'ArrowLeft') {
          // 키보드 <- 화살표를 눌렀을 때
          if (targetBtnWrap.previousElementSibling) {
            targetBtnWrap.previousElementSibling.children[0].focus();
            tabRemoveEvt(targetTabListWrap, targetPanelWrap);
            tabAddEvt(targetBtnWrap.previousElementSibling.children[0], targetTabWrap);
            $(targetBtnWrap.previousElementSibling.children[0]).trigger('click');

          } else endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
        }
        // 키보드 End 키 눌렀을 때
        else if (e.key == 'End') endKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
        // 키보드 Home 키 눌렀을 때
        else if (e.key == 'Home') homeKeyEvt(targetTabListWrap, targetTabWrap, targetPanelWrap);
      };
      // tab active event
      const tabAddEvt = (currentTarget, targetPanelWrap) => {
        // 선택 된 탭 속성 true 로 변경
        currentTarget.setAttribute('aria-selected', 'true');
        currentTarget.removeAttribute('tabindex');
        currentTarget.parentElement.classList.add('active');
        //mtargetbtn.innerText = currentTarget.parentElement.innerText;

        // 연결 된 tabpanel 숨김 해제
        if(targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`) != null) { //html load 아닌 경우 ex)E-역사관
            targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).removeAttribute('hidden');
            //접근성 targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).setAttribute('tabindex', '0');
            if(targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).querySelector('[role=tab]') != null){
                $(targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).querySelector('[role=tab]')).trigger('click');
                $(targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).querySelector('[role=tab]')).parent().siblings().children().attr('aria-selected', 'false');
                //접근성 $(targetPanelWrap.querySelector(`[aria-labelledby="${currentTarget.id}"]`).querySelector('[role=tab]')).parent().siblings().children().attr('tabindex', '-1');
            }
        }
      };
      // tab active remove event
      const tabRemoveEvt = (tabListWrap, tabPanelWrap) => {
        targetTabListWrap.querySelectorAll('li').forEach((tabBtnWrap) => {
          // 기존에 선택 된 탭 속성 false 로 변경
          if (tabBtnWrap.classList.contains('active')) {
            tabBtnWrap.classList.remove('active');
            tabBtnWrap.querySelector('[role="tab"]').setAttribute('aria-selected', 'false');
            //접근성 tabBtnWrap.querySelector('[role="tab"]').setAttribute('tabindex', '-1');
          };
        });
        // 기존에 선택 된 tabpanel 숨김
        for (let tabPanel of targetPanelWrap.children) {
          tabPanel.setAttribute('hidden', 'false');
          tabPanel.setAttribute('tabindex', '-1');
        };
      };
      // 키보드 Home key Event (선택된 탭 리스트 중 첫 번째 리스트로 포커스 이동)
      const homeKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
        targetTabListWrap.children[0].children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetTabListWrap.children[0].children[0], targetTabWrap);
        $(targetTabListWrap.children[0].children[0]).trigger('click');
      };
      // 키보드 End key Event (선택된 탭 리스트 중 마지막 리스트로 포커스 이동)
      const endKeyEvt = (targetTabListWrap, targetTabWrap, targetPanelWrap) => {
        const targetTabLists = targetTabListWrap.querySelectorAll('li');
        targetTabLists[targetTabLists.length - 1].children[0].focus();
        tabRemoveEvt(targetTabListWrap, targetPanelWrap);
        tabAddEvt(targetTabLists[targetTabLists.length - 1].children[0], targetTabWrap);
        $(targetTabLists[targetTabLists.length - 1].children[0]).trigger('click');
      };
      // 클릭/키보드 탭 이벤트 제거/할당
      tabGroups.forEach((tabWrapper) => {
        const tabBtns = tabWrapper.querySelectorAll('[role="tab"]');
        tabBtns.forEach((tabBtn) => {
          tabBtn.removeEventListener('click', tabClickEvt);
          tabBtn.addEventListener('click', tabClickEvt);
          tabBtn.removeEventListener('keyup', tabKeyUpEvt);
          tabBtn.addEventListener('keyup', tabKeyUpEvt);
        });
      });
    };

}
