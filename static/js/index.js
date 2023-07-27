// JavaScript Document
$(document).ready(function(e) {
	
	(function(){
	 var obj=$('.banner');
	 var pic=$('.banner ul').children('li');
	 var ann=$('.banner .num').children('a');
     
	 $('.banner ul').children('li').eq(0).css('opacity',1);
	 opacityPic(obj,pic,ann);
	})();//轮播图切换
	
	(function(){
	  var aLi=$('.box .author').children('li');
	  
	  var oP=aLi.find('p');
	  var M_ww=0;
	  var arr_op=new Array();
	  oP.each(function(i)
	   {
		 M_w=(aLi.eq(0).outerHeight()-oP.eq(i).outerHeight(true))/2;
         $(this).css('top',M_w);
		 arr_op.push(M_w);
      });//作家文字垂直居中
	  aLi.each(function(i)
	  {
        $(this).hover(function()
		 {  
			  $(this).find('.mask').stop(true,true).animate({opacity:0});
			  $(this).find('p').stop(true,true).animate({top:-oP.eq(i).outerHeight(true),opacity:0});
		 },function()
		 {
			  $(this).find('.mask').stop(true,true).animate({opacity:1})
			  $(this).find('p').stop(true,true).animate({top:arr_op[i],opacity:1});
		 });
      });//作家遮罩层
	})(); //作家
	
	(function()
	{
		var body_h=0;
		var top=$('.box_3').offset().top-$('.box_3').outerHeight();
		$(window).scroll(function()
		{
			if($('.box_3').find('image').is(':hidden'))
			{
				if($(window).scrollTop()>top)
				{
					$('.box_3').find('image').fadeIn('slow');
				};	
			}
		})
	})();//延迟加载
});