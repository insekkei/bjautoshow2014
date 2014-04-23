$(function(){

	var winWidth = 0,
		left = 0,
	   winHeight = 0,
	    titletop = 0;
			
	//文本缩进
	$('#fullimage').nextAll('p').addClass("ind");

	//bxCarousel.js中图片轮播方法--特别报导
	$('#spec-box').bxCarousel({
		display_num: 4, 
		move: 2,
		margin: 10 
	});
	//深度分析
	$('#analy-box').bxCarousel({
		display_num: 4, 
		move: 2,
		margin: 10 
	});


	//显示深度分析box
	$('.hc-inspect').click(function(e){
		e.preventDefault();
		//打开深度解析
		$(this).addClass('actived');
		$('.box.analy').css('opacity','1');
		$('.box.analy').css('z-index','1000');
		//关闭特别报导
		$('.hc-special').removeClass('actived');
		$('.box.spec').css('opacity','0');
		$('.box.spec').css('z-index','-1');

		//深度解析浮层状态对cover层影响
		var o2 = $('.box.analy').css('opacity');
		if(o2==1){
			$('.cover').css('display','block');
		}else{
			$('.cover').css('display','none');
		}
		resetHeader();
	});
	
	//初始化头图
	resetHeader();
	//窗口大小变化时...
	$(window).resize(function(e) {
		resetHeader();
	});
	
	//窗口大小变化引发的一系列血案...
	function resetHeader(){
		winWidth = $(window).width(),
		left = (winWidth-600)/2,
		winHeight = $(window).height(),
		titletop = winHeight/3;
		
		if(left>20){
			$('.hc-headerbg .title').css('left',left+'px');
		}else{
			$('.hc-headerbg .title').css('left',5+'px');
			$('.hc-headerbg .title h1').css('top',-winHeight/1.2+'px');
		}
			
		//头图大小
		$('.artimg div.img').css('height',winHeight+'px');
		
		//如果有box，不同分辨率下模式切换
		var dp = $('.minibox').css('display'),
		     o = $('.box.spec').css('opacity');
		if(winWidth>640){
			$('#comment').css('margin-top',winHeight+'px');
			//>640时不显示minibox而显示box，显示cover层
			if(dp.match('block')=='block'){
				$('.cover').css('display','block');
				$('.minibox').css('display','none');
				$('.box.spec').css('opacity','1');
				$('.box.spec').css('z-index','1000');
			}else if((dp.match('block')!='block')&&(o!=1)){
				//去除cover层
				$('.cover').css('display','none');	
			}
			
		}else{
			$('#comment').css('margin-top',0);
			//<640时不显示box而显示minibox，显示cover层
			if(o==1){
				$('.cover').css('display','block');
				$('.minibox').css('display','block');
			}else if((dp.match('block')!='block')&&(o!=1)){
				//去掉cover层
				$('.cover').css('display','none');
			}
		}

	}
	
	if(winWidth<640){
		//显示下一步图片
		$('.hc-headerbg .title h1').append("<p class='nextstep'><img src='../images/button_down.png'></p>");
		$('.nextstep').css('top',winHeight/3+'px');
		//头图部分显示小图片
		var bg = $('.artimg .img').css('background-image').split('nine-cars');
			bg = bg[0]+'nine-cars/mobile'+bg[1];
		$('.artimg .img').css('background-image',bg)
		//正文部分显示小图片
		$('.article img').each(function(e){
			var src = $(this).attr('src').split('nine-cars');
			src = src[0]+'nine-cars/mobile'+src[1];
			$(this).attr('src',src);
		});
	}
	
	//点击特别报导出现浮层，根据不同窗口宽度调用不同box，出现cover层
	$(".hc-special").click(function(e){
		e.preventDefault();
		$(this).addClass('actived');
		$('.cover').fadeOut(0);
		if(winWidth>640){
			//关闭深度解析
			$('.hc-inspect').removeClass('actived');
			$('.box.analy').css('opacity','0');
			$('.box.analy').css('z-index','-1');
			//打开特别报导
			$('.box.spec').css('opacity','1');
			$('.box.spec').css('z-index','1000');
			
		}else{
			$('.minibox').toggle(100);
		}
		
	});

	//点击别处浮层消失made总感觉不用event.target就是作弊
	$('.cover').click(function(e){
		$(this).fadeOut(0);
		$('.minibox').fadeOut(100);
		$('.box').css('opacity','0');
		$('.box').css('z-index','-1');
	});
	
	//关闭box
	$('.close').click(function(e){
		$('.box').css('opacity','0');
		$('.box').css('z-index','-1');
		$('.hc-special').removeClass('actived');
		$('.hc-inspect').removeClass('actived');
	});
	//滚动到头图以下时导航条加阴影
	$(window).scroll(function () {
		if ($(window).scrollTop() > winHeight) {
			$("#navbar_menu_fixed").css('box-shadow','0 3px 3px #aaa');
			$("#navbar_menu_fixed").css('-webkit-box-shadow','0 3px 3px #aaa');
		}
		else {
			$("#navbar_menu_fixed").css('box-shadow','0 0 0 #aaa');
			$("#navbar_menu_fixed").css('-webkit-box-shadow','0 0 0 #aaa');
		}
	});
});

