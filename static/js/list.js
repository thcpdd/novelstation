// JavaScript Document
$(function(){
	(function(){
		var not_obj=$('.notice');
		var ann=not_obj.children('ul');
		var li_w=not_obj.find('li').outerHeight(true);	
		var li_len=not_obj.find('li').length;
		var ann_h=li_w*li_len;
		var not_h=not_obj.outerHeight();
	
		if(not_h<ann_h)
		{
		   not(not_obj,3,3000);
		}
		function not(obj,num,delay)
		{
			var t=null;
			var zui_num=0;	
			obj.hover(function()
			{
				clearInterval(t);
			},function()
			{
				t=setInterval(function(){notice(ann,num)},delay)
			}).trigger('mouseleave');
			
			function notice(obj,num)
			{
				zui_num=Math.ceil(ann_h/li_w)-Math.ceil(not_h/li_w);
				if(num>zui_num)num=zui_num;
				obj.animate({marginTop:-num*li_w},num*300,'linear',function()
				{
					$(this).css('margin-top',0).find('li').slice(0,num).appendTo($(this));
				});
			//	console.log(num);
			}
		}//----------------------------------------------------------滚动公告
	})();//新书上架
	
	(function(){
	 var tab_meun=document.getElementsByClassName('two')[0];
	 var tab_ul=tab_meun.getElementsByTagName('ul');
	 var tab_tit=tab_meun.getElementsByTagName('p')[0].children;
	 var len=tab_tit.length;
	 var now=0,t=null,n=0;
	  
	 for(var i=0;i<len;i++)
	 {
		(function(i){
		tab_tit[i].onclick=function()
		{
		    tab(i);
		} 
		})(i);
     } 
     function tab(n)
	 { 
		 if(n!=now)
		 {
		   addClass(tab_tit[n],'active');
		   removeClass(tab_tit[now],'active');
		   addClass(tab_ul[n],'active');
		   removeClass(tab_ul[now],'active');
		 }
		 now=n;
	};
	t=setInterval(function()
	{
		n++;
		if(n==len)
		{n=0;}
	    tab(n);
	 },4000);	
		
	tab_meun.onmouseover=function(){clearInterval(clearInterval(t));}
	tab_meun.onmouseout=function()
	{
		t=setInterval(function()
		{
			n++;
			if(n==len)
			{n=0;}
			tab(n);
		 },4000);		
		}
	})();//tab 菜单切换
	
	// (function(){
	//   var catalog=$('.tab_1 .tab_list')
	//   var j=0;
	//   if(catalog)
	//   {   var len=catalog.length;
	// 	  $('#up').click(function()
	// 	  {
	// 		  catalog.each(function(i)
	// 		  {
    //           $(this).slideToggle(i*500,'linear')
    //          });
	// 		 if(++j%2==0)
	// 		 {
	// 		  $(this).find('samp').text('查看全部');
	// 		 // $(this).find('span').css('transform','rotate(0deg)');
	// 		 }
	// 		 else
	// 		 {
	// 		  $(this).find('samp').text('收起');
	// 		  $(this).find('span').css('background-position','-60px -40px');
	// 		 }
	// 	  })
	//   }//展开章节
	// })();
		
	
	(function(){
		var tab=$('.list .tab li');
		var len=tab.length;
		var tab_c=$('.list .tab_1');
		var t=null,i=0;
        var list_top=$('.list').offset().top;

	  $(window).scroll(function()
	  {
		   if($(window).scrollTop()>=list_top)
		   {
			   $('.list .tab').css({'position':'fixed',top:0});
		   }
		   else
		   {
			 $('.list .tab').css({'position':'static'});
		   }
	  });//固定子导航栏

		tab.each(function(i) {
		var	Top=tab_c.eq(i).offset().top-100;
            $(this).click(function()
			{
		      scr_TopRun(t,Top);
			$(this).addClass('active').siblings('li').removeClass('active');
			});
        });/*鼠标点击跳转到对应地方*/
	})();/*左边--------------------------------------书籍简介页面-*/
	
	// (function(){
	//
	// 	var big_play=$('.play .start .icon');
	//
	//     var t_tit=$('.play_t').find('a');
	// 	var small_play=$('.mu li').children('span');
	// 	var s_tit=null,now=0,n=0;
    //     var sound=$('.sound').children('image');
	//     var guan=null;
	// 	big_play.click(function()
	// 	 {
	// 	 	var id=big_play.attr('id');
	// 	    id=id.substring(1);
	// 		guan=big_play.hasClass('play_1');
	// 		if(guan==true)
	// 		{
	// 			$('.mu li').children('#b'+id).removeClass('play_3');
	// 			$('.mu li').children('#b'+id).addClass('play_4');
	// 			big_play.removeClass('play_1');
	// 			big_play.addClass('play_2');
	// 		}
	// 		else
	// 		{
	// 			$('.mu li').children('#b'+id).removeClass('play_4');
	// 			$('.mu li').children('#b'+id).addClass('play_3');
	// 			big_play.removeClass('play_2');
	// 			big_play.addClass('play_1');
	// 		}
	// 	});//第一个控制下边列表开关
	//
	// 	small_play.each(function(i)
	// 	{
	// 		$(this).click(function()
	// 		{
	// 			var id=big_play.attr('id');
	// 	        id=id.substring(1);
	//
	// 			if(i!=now)
	// 			{
	// 				if(small_play.eq(now).hasClass('play_4'))
	// 				{
	// 					small_play.eq(now).removeClass('play_4');
	// 					small_play.eq(now).addClass('play_3');
	// 					--n;
	// 				}
	// 				big_play.removeClass('play_1');
	// 				big_play.addClass('play_2');
	// 				$(this).removeClass('play_3');
	// 				$(this).addClass('play_4');
	// 				small_play.eq(now).parent('li').removeClass('active');
	// 				small_play.eq(i).parent('li').addClass('active');
	// 			   ++n;
	// 			}
	// 			else
	// 			{
	// 				console.log(n)
	// 				if(n%2==0)
	// 				{
	// 				 	big_play.removeClass('play_1');
	// 				    big_play.addClass('play_2');
	// 				 	$(this).removeClass('play_3');
	// 				    $(this).addClass('play_4');
	// 				}
	// 				else
	// 				{
	// 					big_play.removeClass('play_2');
	// 				    big_play.addClass('play_1');
	// 				 	$(this).removeClass('play_4');
	// 				    $(this).addClass('play_3');
	// 				}
	// 				++n;
	// 			}
	// 			s_tit=$(this).siblings('a').text();
	// 			if($(this).attr('id').substring(1)!=id)
	// 			{
	// 			   var b_id='p'+$(this).attr('id').substring(1);
	// 			   var sound_id='b'+$(this).attr('id').substring(1);
	// 				big_play.attr('id',b_id);  //大的播放按钮
	// 				t_tit.html(s_tit);      //-----标题
	// 				sound.attr('class',sound_id); //声音流
	// 			}
	//
	//
	// 			now=i;
	// 		});
    //     });//列表开关控制播放开关
	// })();//------------------播放开关
	
	(function(){
		var Top=0,t=null;
		$('.pl_c').click(function()
		{
			Top=$('.zong').offset().top-200;
			 scr_TopRun(t,Top);
		});
	})();//---------------------------------听书列表页点击评论
    
	(function(){
		$('.play_xq .fx_c').each(function(n) {
			var i=0;
          $(this).click(function(){
	      	
			if(i%2==0)
			{
			 $('.play_xq').eq(n).find('.fx_con').css('display','block');
		      $('.play_xq').eq(n).find('.fx_con').animate({'opacity':1});
			
			}
			else
			{
				 $('.play_xq .fx_con').eq(n).animate({'opacity':0},function()
				 {
				   $('.play_xq .fx_con').eq(n).css('display','none');
				 });
			}
		    ++i;
		 });
		  $('.play_xq .fx_con').eq(n).find('.colse').click(function()
		  {
			 $('.play_xq .fx_con').eq(n).animate({'opacity':0},function()
			  {
				  $('.play_xq .fx_con').eq(n).css('display','none');
			  });
			 --i;
		  });
        });
	})();//-----------------------------分享
	
	// (function(ev){
	// 	var ev=ev;
	// 	var dian=6;
	// 	var sound=$('.play .sound');
	// //	var L=sound.offset().left;//容器的左边距
	// 	var W=sound.width()-dian;//698-5 鼠标移动范围--容器总的宽度
	//
	// 	var stream=sound.children('.sound_stream');
	//     var t_w=stream.outerWidth();//时间指示牌的宽度
	// 	    t_w=Math.floor(t_w/2)-dian/2;
	// 	 sound.hover(function()
	// 	 {
	// 	     stream.css({'display':'block'});
	// 		 stream.animate({opacity:1},'fast','linear');
	//
	// 	 },function()
	// 	 {
	// 		  stream.animate({opacity:0},'fast','linear',function()
	// 		  {
	// 			  $(this).css('display','block');
	// 		  });
	// 	 });//------------------------显示鼠标移动
	//
	// 	$('.play .sound').mousemove(function(ev)
	// 	{
	// 		var L=sound.offset().left;//容器的左边距
	// 	    var disx=ev.clientX-L;
	// 		if(disx<0)
	// 		{
	// 			 $(this).find('.s_2').css('left',0);
	// 		}
	// 		else if(disx>=W)
	// 		{
	// 		  $(this).find('.s_2').css('left',W);
	// 		}
	// 		else
	// 		{
	// 		  $(this).find('.s_2').css('left',disx);
	// 		}
	// 		//----------------------------------------------------
	// 		if(disx<=t_w)
	// 		{
	// 		  $(this).find('.time').css('left',0);
	// 		}
	// 		else if(disx>=W-t_w*2)
	// 		{
	// 		$(this).find('.time').css('left',W-t_w*2);
	// 		}
	// 		else
	// 		{
	// 		$(this).find('.time').css('left',disx-t_w);
	// 		}
	//
	// 	});//鼠标移动控制声音流
	//
	//    var big_play=$('.play .start .icon');
	//    var guan=null,kai=null;
	//
	// 	$('.play .sound').click(function(ev){
	//
	// 	   var big_id=big_play.attr('id');
	// 	   var big_id=big_id.substring(1);
	// 	   var small_play=$('.mu li').children('#b'+big_id);
	//
	// 		guan=big_play.hasClass('play_1');
	//
	// 		if(guan==true)
	// 		{
	// 			big_play.removeClass('play_1');
	// 			big_play.addClass('play_2');
	// 			small_play.removeClass('play_3');
	// 			small_play.addClass('play_4');
	// 		}
	// 		else
	// 		{
	// 			big_play.removeClass('play_2');
	// 			big_play.addClass('play_1');
	// 			small_play.removeClass('play_4');
	// 			small_play.addClass('play_3');
	// 		}
	//
	// 		//------------------------小大播放器开关
	// 		//var disx=ev.clientX-L;	//----------声音流位置
	// 	});//--------------------------控制开关
	//
	// })();//------------------------------------移动声音流，控制开关
	
});
