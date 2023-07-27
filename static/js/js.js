// JavaScript Document
$(document).ready(function(e) {

    (function(){
		$('.reg .self').hover(function()
		 { 
		    $('.reg .split').css('color','transparent');
		    $(this).find('ul').css({'display':'block','border-color':'#D0CDCD'});
			$('.reg .self').stop(true,true).find('ul').animate({opacity:1,height:140},'slow','swing');
		 },
		function()
		 {
			$('.reg .self').stop(true,true).find('ul').animate({opacity:0,height:0},'slow','swing',function()
			 {
			  $(this).css({'display':'none','border-color':'transparent'});
			  $('.reg .split').css('color','#333');
			});

		});
	})();//个人中心
	
	(function(){
		var Li_w=$('.nav_1').children('li').eq(0).outerWidth(true);
		var active=$('.nav_1 .active');
		var now=0;
		$('.nav_1').children('li').each(function(i) 
		{
	       $(this).children('a').addClass('ease');
            var This=$(this);
            $(this).find('a').mouseover(function()
			{
				This.find('ul').stop(true,true).slideDown(500,'swing');
			});
			$(this).mouseleave(function(){
				$(this).find('ul').stop(true,true).slideUp(500,'swing');
			});
			
			$(this).click(function()
			{
				if(i!=now)
				{
				 var num=Math.abs(i-now);
                 $(this).children('a').css('color','#fff');
				 $(this).siblings('li').children('a').css('color','#333');
				 active.animate({left:Li_w*i},num*260-num*100);
				 now=i;
				}
			});
        });		
	})();//2级下拉菜单
	
	(function(){
		var kg=/^\s*$/;
	$('.search input[type=text]').focus(function(){
		if($(this).attr('placeholder','请输入书名或作者名称'))
		{
		$(this).attr('placeholder','');
		}
	});
	$('.search input[type=text]').blur(function(){
		if(kg.test($(this).val()))
		{
		  $(this).attr('placeholder','请输入书名或作者名称');
		}
	});
   })();//------------------搜索框
   
   (function(){
	   $('.con_list').find('li').each(function(index) 
		{
		   $(this).hover(function()
			{
			  $('.con_list').find('.sm').slideDown('fast','linear');
			},function()
			{
			  $('.con_list').find('.sm').slideUp('fast','linear'); 
			});
		});
   })();//----------------------------- 频道列表页显示书籍详情、说明
   
   (function(){
	  $('.sc_c').one('click',function()
	  {
		  $(this).find('b').animate({top:-20,opacity:1},'slow','swing',function()
		  {
			   $(this).animate({opacity:0},'slow','swing',function()
			   {
				   $(this).css('top',0);
			 });
		 });
	  });   
   })();//-----------------------加入收藏
   
  $.extend({ 
  'wheel':function(){  preDe_w();}, //阻止默认事件
  'dewheel':function(){ preDe_w2();}//移除默认事件
  })	// 扩展插件 
   
});

function opacityPic(obj,pic,ann)
{
	var len=pic.length;
	var now=0,t=null;
	
    function opacity(n,oldnow)//2,0
	 {
		 if(oldnow==-1)
		 {  
			 pic.eq(len-1).animate({opacity:0},'slow');
			 pic.eq(n).animate({opacity:1},'slow'); 
			 pic.eq(len-1).removeClass('active');
			 ann.eq(len-1).removeClass('active');  
	     }
		 else
		 {
			 pic.eq(oldnow).animate({opacity:0},'slow');
			 pic.eq(n).animate({opacity:1},'slow');
			 pic.eq(oldnow).removeClass('active');
             ann.eq(oldnow).removeClass('active');
		 }
		  pic.eq(n).addClass('active');
		  ann.eq(n).addClass('active');
		  
	 }
	 obj.hover(function()
	 {
		 clearInterval(t);
	 },function()
	 {
		t=setInterval(function()
		{
		  now++;
		  if(now==len)
		  {now=0}
		   opacity(now,now-1);
		},3000); 
	 }).trigger('mouseleave');
	 
	 ann.each(function(i)
	 {
		 $(this).click(function(){
			 
			if(now!=i)
			{
				opacity(i,now);
			} 
			/*console.log(i);//1
			console.log(now);//0*/
			now=i;
			
		  });
		  
     });
}//轮播图切换


function getClass(obj,tag,oclass)
{
    var aResult=obj.getElementsByTagName(tag);
	var arr=[];
	var re=new RegExp('(^|\\s)*'+ oclass +'(\\s|$)*');
	for(var i=0;i<aResult.length;i++)
	{
	   if(re.test(aResult[i].className))
	   {
		   arr.push(aResult[i]);
		}	
	}
	return arr;	
}

function removeClass(obj, sClass) { //移除class样式
	var aClass = obj.className.split(' ');
	if (!obj.className) return;
	for (var i = 0; i < aClass.length; i++) {
		if (aClass[i] === sClass) {
			aClass.splice(i, 1);
			obj.className = aClass.join(' ');
			break;
		}
	}
}


function addClass(obj,oclass)
{
	if(!obj.className)
	{
	  obj.className=oclass;	
	}
	else
	{
		 var aclass=obj.className.split(' ');
		 for(var i=0;i<aclass.length;i++)
		 {
			if(aclass[i].className==oclass) 
			{return;}
			else
			{
				obj.className+=' '+oclass;
			}
		 }
	}
}



function css(obj,attr,val)
{
	if(arguments.length==2)
	{
	 var val=parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj,false)[attr])	
	 if(attr=='opacity')
	 {
	  val*=100;	
	 }
	 return val;
	}
	else if(arguments.length==3)
	{
		switch(attr)
		{
			case 'paddingTop':
			case 'paddingLeft':
			case 'paddingRight':
			case 'paddingBottom':
			case 'fontSize':
			case 'borderWidth':
			case 'width':
			case 'height':
			  val=Math.max(val,0);
			case  'left':
			case 'top':
			case  'right':
			case 'bottom':
			case 'marginTop':
			case 'marginLeft':
			case 'marginRight':
			case 'marginBottom':
			   obj.style[attr]=val+'px';
			   break;
			case 'opacity':
			   obj.style.filter='alpha(opacity='+val+')';
			   obj.style.opacity=val/100;
			   break;
			 default:
			 obj.style[attr]=val;
			 break;
		}
		return function (attr_in, value_in){css(obj, attr_in, value_in)};	
   }
}
function linear(obj,attr,targin,s,fn)
{
	obj.t=clearInterval(obj.t);
	if(typeof s=='undefined')
	{
		s=5;
	}
	obj.t=setInterval(function()
	{
		var cur=css(obj,attr);
		if(cur > targin)
		{
		 speed=-s;
		}
		else
		{  speed=s;}
		
		if(Math.abs(cur-targin)<=Math.abs(speed))
		{
			css(obj,attr,targin);
			 clearInterval(obj.t);
			 if(fn)fn.call(obj);
		}
		else
		{
			cur+=speed;
			css(obj,attr,cur);
		}
	
	},10);
}
function scr_top()
{
	return document.body.scrollTop ||document.documentElement.scrollTop;
}

function run(obj,json,type,s,fn)
{
	clearInterval(obj.t);
	var but=true;

	switch(type)
	{
	  case 'linear':
	  if(typeof s!='number')
		{
			var speed=5;
		}
		else
		{
			if(parseInt(s)<1)
				var speed=5;
			else
			  var speed=s;
		}
		var ss=0;
	   break;
	   default:
	     var speed=0,ss=0;
	   break;
	}

	obj.t=setInterval(function(){
	  but=true;
	  for(var attr in json)
	  {
	   var cur=css(obj,attr);

		  switch(type)
		  {
		   case 'linear':
		     cur<json[attr]?ss=speed:ss=-speed;//---------------------匀速运动必须重新赋值一次  有正负值的原因
			 /*console.log(speed);
			 console.log(ss);*/
			 if(Math.abs(json[attr]-cur)<=Math.abs(ss))
			 {
				 css(obj,attr,json[attr]);
			 }
			 else
			 {
				but=false;
				cur+=ss;
				css(obj,attr,cur);
			 }
		   break; //-------------------匀速运动
		   case 'buffter':
			   speed=(json[attr]-cur)/10;
			   speed>0?Math.ceil(speed):Math.floor(speed);
			   if(cur!=json[attr])
				 {
					 but=false;
					 cur+=speed;
					 cur=parseInt(cur);
					 css(obj,attr,cur);
				 }
			 break;//--------------------缓冲运动
			case 'elastic':
			   speed+=(json[attr]-cur)/5;
			   speed*=0.75;
			   ss=speed;
			   if(Math.abs(json[attr]-cur) && Math.abs(speed)<1)
			   {
			     css(obj,attr,json[attr]);
				}
			   else
				 {
					but=false;
					cur+=ss;
					css(obj,attr,cur);
				 }
			break; //-------------------弹性运动
			 default:
			 	speed=(json[attr]-cur)/10;
			   speed>0?Math.ceil(speed):Math.floor(speed);
			   if(cur!=json[attr])
				 {
					 but=false;
					 cur+=speed;
					 cur=parseInt(cur);
					 css(obj,attr,cur);
				 }
			break;//--------------------缓冲运动
		  }//----------------------------------------------switch 结束
	  }//json结束
	  if(but)
	  {
		clearInterval(obj.t);
		if(fn)fn.call(obj);
	  }
	},30);
}//任意值---缓冲、弹性、匀速运动

function scr_TopRun(t,Top)
{
	clearInterval(t);
	 var w_t=$(window).scrollTop();

	 if(w_t<Top)
	 {

		t=setInterval(function()
		{
			w_t+=35;
			$(window).scrollTop(w_t);
			if(w_t>=Top)
			{
			  clearInterval(t);
			}
		},40);
	 }
	 else
	 {
		t=setInterval(function()
		{
			w_t-=35;
			$(window).scrollTop(w_t);
			if(w_t<=Top)
			{
			  clearInterval(t);
			}
		},40);
	 }
}//---------------------------------运动滚动条

var preDe=function(e){e.preventDefault(); }

function preDe_w()
{
	if(window.addEventListener)
	{
	window.addEventListener("mousewheel",preDe,false); //其他
	window.addEventListener("DOMMouseScroll",preDe,false);//火狐
	window.addEventListener("keydown",preDe,false); 
	}
	else if(window.attachEvent)
	{
		window.attachEvent('on',mousewheel,preDe);
		window.event.returnValue = false;
	}
	window.onmousewheel=function(){return false;}	
}

function preDe_w2()
{
	if (window.removeEventListener) {                   // // 所有浏览器，除了 IE 8 及更早IE版本
		   window.removeEventListener("mousewheel",preDe,false);
	       window.removeEventListener("DOMMouseScroll",preDe,false); //火狐
		   window.removeEventListener("keydown",preDe,false);
		}
    else if(window.detachEvent)           // IE 8 及更早IE版本
	{
		window.detachEvent('on',mousewheel,preDe);
		window.event.returnValue = true;
	}
	window.onmousewheel=function(){return true;}
}//阻止和取消默认事件------------------禁止滚动条滚动

function  bubble(e)
{
if ( e && e.stopPropagation )
　   {       　// 因此它支持W3C的stopPropagation()方法
　       　e.stopPropagation();
	 }
	else
　   {   　//否则，我们需要使用IE的方式来取消事件冒泡
　　   window.event.cancelBubble = true;

	 }	   return false;

}//阻止冒泡

function fm(form)
{
	var file=form.find('.up_img .up_img2');  //文件域
	var fm_img=form.find('.up_fm .fm_img'); //图片
	var fm_del=form.find('.up_fm .fm_colse');//删除图片
	
	var fm_src=fm_img.attr('src');
	var load_img=$('.center_r .up_load');
	
	file.change(function()
	{
		 //console.dir(file[0].files)
		/*
		  ajax只上传图片，返回图片地址
		*/ 
	  $.ajax({
		 type:'POST',
		 url:'up_file.php',
		 data:new FormData(form[0]), //收集表单信息
		 processData: false, //不需要对数据做处理
	     contentType: false, //因为是由<form>表单构造的FormData对象，且已经声明了属性enctype="multipart/form-data"，所以这里设置为false。
		 beforeSend: function(){
			 load_img.css('display','block');
		 },
		 success: function(data){
		 var data=JSON.parse(data);

			if(data['status']==1)
			{
			 fm_img.attr('src',data['name']);
			}
			load_img.css('display','none');
		},
		 error: function(xhr)
		 {
			load_img.css('display','none');
			alert(xhr.status+': '+xhr.statusText);
		 },
		 timeout:2000
	 });
	
	});
	fm_del.click(function()
	{
		if(fm_img.attr('src')!=fm_src)
		{
			fm_img.attr('src',fm_src);
		}
		
	});
}//-----------------------------设置封面

function getLength(str)
{
   var len=str.replace(/[^\x00-\xff]/g,'aa').length;
   return  Math.ceil(len/2);
}//-------字符长度

function wh(obj)
{
   var o_w=obj.offsetWidth
   var o_h=obj.offsetHeight;
   var o_l=obj.offsetLeft;
   var o_t=obj.offsetTop;
   return {w:o_w,h:o_h,l:o_l,t:o_t};	
}
function tab(an,con,len)
{
  var now=0;
 for(var i=0;i<len;i++)
 {
	an[i].index=i;
	an[i].onclick=function()
	{
		if(con[0].style.display=='block')
		{
			now=0;
		}//---------------------------点击左边不是个人资料是修改头像
		if(con[1].style.display=='block')
		{
			now=1;
		}//---------------------------头像
		if(con[2].style.display=='block')
		{
			now=2;
		}//---------------------------用户名
		if(con[3].style.display=='block')
		{
			now=3;
		}//---------------------------邮箱
	   if(now!=this.index)
		{
		removeClass(an[now],'active');
		addClass(an[this.index],'active');
		con[now].style.display='none';
		con[this.index].style.display ='block';
		} 

		now=this.index;
	};
 } 
}//------------------tab表单切换

function pos_con(obj,w,h)
{
   var client_h=document.documentElement.clientHeight || document.body.clientHeight;//页面工作区高度
   var client_w=document.documentElement.clientWidth || document.body.clientWidth;//页面工作区高度
   var comm_w=obj.offsetWidth;
   var comm_h=obj.offsetHeight;
    if(comm_w==undefined)
	 { comm_w=0}
	 if(comm_h==undefined)
	 {comm_h=0}

   if(w!=undefined &&  comm_w==0)
   {
	    comm_w=w; 
	}
   if(h!=undefined && comm_h==0)
   {
	   comm_h=h;
	}

   var comm_l=(client_w-comm_w)/2;
   var comm_t=(client_h-comm_h)/2-100;
   /*css(obj,'left',comm_l);
   css(obj,'top',comm_t);*/
   obj.style.left=comm_l+'px';
   obj.style.top=comm_t+'px';

}//-----------------------------------弹窗位置
	
function self_re(obj,re)
{
	var kg=/^\s*$/;		
	obj.blur(function()
	{
		val=$(this).val();
	
		if(!kg.test(val))
		{
			if(!re.test(val))
			{
			  $(this).siblings('i').css('color','red');
			}
			
		}else
		{
			$(this).siblings('i').css('color','red');
		}
	});
	
	obj.focus(function()
	{
		$(this).siblings('i').removeAttr('style');
	});
}//----------------------------------------------------必填项

function self_equal(obj,obj2)
{
	obj.blur(function()
	{
		if(obj.val()!==obj2.val())
		{
			$(this).siblings('i').css('color','red');
		}
	});
	obj.focus(function()
	{
		$(this).siblings('i').removeAttr('style');
	});
}//-------------------------------判断密码是否一致

	   
function noReqiured(obj,re)
{var kg=/^\s*$/;		
   obj.blur(function()
   {
	  val=$(this).val();
	  if(!kg.test(val))
	   {
		   if(!re.test(val))
		   {
			 $(this).siblings('i').css('color','red');  
		  }
	  }
  });
  obj.focus(function()
 {
	$(this).siblings('i').css('color','#999');
});
}//----------------------------不是必填项


