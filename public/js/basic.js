/*모바일 높이*/
document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + 'px');	

$(document).ready(function(){	
	/*header*/
	$('#header nav').mouseenter(function(){
		$('#header').addClass('enter');
	}).mouseleave(function(){
		$('#header').removeClass('enter');
	})

	$('.gnb-bg').css('width',$('body').innerWidth());
	$(window).resize(function(){
		$('.gnb-bg').css('width',$('body').innerWidth());
	});

	/*fade in*/
	if( $('.fade-self').length > 0 ){
		$('.fade-self').each(function(i){		
			var btm_item_self = $(this).offset().top + $(this).outerHeight()/3;
			var btm_window_self = $(window).scrollTop() + $(window).height();            
			if(btm_window_self >= btm_item_self){
				$(this).addClass('show');
			}
		}); 
	}		
	if( $('.fade-box').length > 0 ){
		$('.fade-box').each(function(i){		
			var btm_item_box = $(this).offset().top + $(this).outerHeight()/1.5;
			var btm_window_box = $(window).scrollTop() + $(window).height();            
			if(btm_window_box >= btm_item_box){
				$(this).find('.fade').addClass('show');
			}
		}); 
	}
	if( $('.fade-box-dr').length > 0 ){
		$('.fade-box-dr').each(function(i){		
			var btm_item_dr = $(this).offset().top;
			var btm_window_dr = $(window).scrollTop() + $(window).height();            
			if(btm_window_dr >= btm_item_dr){
				$(this).find('.fade').addClass('show');
			}
		}); 
	}				
	$(window).scroll(function(){
		if( $('.fade-self').length > 0 ){
			$('.fade-self').each(function(i){		
				var btm_item_self = $(this).offset().top + $(this).outerHeight()/3;
				var btm_window_self = $(window).scrollTop() + $(window).height();            
				if(btm_window_self >= btm_item_self){
					$(this).addClass('show');
				}
			}); 
		}		
		if( $('.fade-box').length > 0 ){
			$('.fade-box').each(function(i){		
				var btm_item_box = $(this).offset().top + $(this).outerHeight()/1.5;
				var btm_window_box = $(window).scrollTop() + $(window).height();            
				if(btm_window_box >= btm_item_box){
					$(this).find('.fade').addClass('show');
				}
			}); 
		}
		if( $('.fade-box-dr').length > 0 ){
			$('.fade-box-dr').each(function(i){		
				var btm_item_dr = $(this).offset().top;
				var btm_window_dr = $(window).scrollTop() + $(window).height();            
				if(btm_window_dr >= btm_item_dr){
					$(this).find('.fade').addClass('show');
				}
			}); 
		}	
	});		
});	