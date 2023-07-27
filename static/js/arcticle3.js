// JavaScript Document
window.onload=function(){

  var fixed_=document.getElementsByClassName('fixed')[0];
  var aIcon=getClass(fixed_,'li','icon');
  
 (function(){
	var cata_click=aIcon[0];
	var cata_log=getClass(fixed_,'div','Catalog')[0];
	
     var i=0,num=50;
     cata_click.onclick=function()
	{
		if(i%2!=0)
		{
		  linear(cata_log,'width',0,5,function()
		  {
			  this.style.display='none';
		  })
			this.style.backgroundColor='';
			i++;
		}
		else
		{
		  cata_log.style.display='block';
		  linear(cata_log,'width',500,5);
		  this.style.backgroundColor='#F1F1F1';
		  i--;
		}
	 }//点开目录
//--------------------------------------------------------------------------	

    var cata_1=getClass(fixed_,'div','cata_1')[0];
	var div_h=css(cata_1,'height');//------------------------容器高度

	var oUl=getClass(cata_log,'ul','cata_con')[0];
	var arr_li=cata_log.getElementsByTagName('li');
	var li_len=arr_li.length;
	var li_h=li_len*css(arr_li[0],'height');
	var ul_h=css(oUl,'height',li_h);
        ul_h=css(oUl,'height');//-------------------------取得内容的高

	if(div_h/ul_h<1)
	{
		var space_h=parseInt(div_h/ul_h*num);
		var scro_ll=getClass(fixed_,'div','scroll')[0];
		css(scro_ll,'height',space_h);//-------------------------设置滚动条的高
		scro_ll.onmousedown=diay;
	}//----------------------------------判断条件是否出现滚动条
	
	function diay(ev)
	{
		var Top=parseInt(css(scro_ll,'top'));

		var ev=ev||event;
		var disY=ev.clientY-Top;	
		if(this.setCapture)
		{
			this.setCapture();
		}
		document.onmousemove=Move;
		document.onmouseup=Up;
		function Move(ev)
		{
		  var t=ev.clientY-disY;	

		  	if(t<=0)
			{
				t=0;
			}
			if(t>=div_h-space_h)
			{
				t=div_h-space_h;
			}
		//	css(scro_ll,'top',t);
		scro_ll.style.top=t+'px';
		var ss=t/(div_h-space_h);

		document.title=ss;
		oUl.style.top=-ss*(ul_h-div_h)+'px';
		}
		function Up()
		{
		  document.onmousemove=null;
		  document.onmouseup=null;
		  if(scro_ll.releaseCapture)
		  {
			 scro_ll.releaseCapture(); 
		  }
		}
	 return false;
	}//拖拽滚动条
  })();	//------------------------------文章目录
  
  (function(){
	var kg=/^\s*$/,i=0;
	var I_ment=getClass(fixed_,'div','I_ment')[0];
	var text=I_ment.getElementsByTagName('textarea')[0];
	var but=I_ment.getElementsByTagName('input')[0];
	var str=I_ment.getElementsByTagName('b')[0];
	var number=Number(str.innerHTML);
	var samp=I_ment.getElementsByTagName('samp')[0];

	var colse=aIcon[1];
	var colse2=getClass(I_ment,'span','icon')[0];

    function f_colse()
	{
		linear(I_ment,'opacity',0,5,function()
		{
		    text.value='我要评论...';
		   	css(text,'color','#666');
		    samp.innerHTML='还可以输入';
			str.innerHTML=number;
			str.style.color='#333';
		    this.style.display='none';	
		});
		i--;
	}//还原最初评论框
	
	colse2.onclick=function()
	{
		f_colse();
	}
	colse.onclick=function()
	{ 
	   if(i%2==0)
	   {
		I_ment.style.display='block';	
		linear(I_ment,'opacity',100); 
		i++;  
	   }
	   else
	   {
         f_colse();
		}
	}//---------------------显示关闭评论框
	
	text.onfocus=function()
	{
	  if(text.value=='我要评论...')
	   {  text.value='';
	      css(text,'color','#333');
	   }
	}
	 text.onblur=function()
	 {
		 if(kg.test(text.value))
		 {
			text.value='我要评论...';
			css(text,'color','#666');
		 }
	}//-----------------文本输入框获取焦点失去焦点
	
	
	var ie=!-[1,];
	if(ie)
	{
		text.onpropertychange=toChange;
	}
	else
	{
	   text.oninput=toChange;	
	} 
	function toChange()
	{
	//	var num=Math.ceil(getLength(text.value)/2);
	var num=getLength(text.value)
		if(num>=5 && num<=number)
		{	
		  but.className='dis';
		}
		else
		{		
			but.className='sub';
        }
		if(num<=number)
		{
		 str.innerHTML=number-num;
		 samp.innerHTML='还可以输入';
		 str.style.color='#333';
		}
		else
		{
			str.innerHTML=num-number;
			samp.innerHTML='已经超出';
			str.style.color='red';
		}
	}
//-----------------------------------------连续触发事件
   
   var mark=document.getElementsByClassName('mark')[0];
   var comm=getClass(mark,'div','mark_bor')[0];
	  pos_con(comm,210);//-----------------弹窗位置
	  
   var t=null;
   but.onclick=function()
   {
	   if(but.className=='dis')
	   {
		 var Top=scr_top();
	     mark.style.top=Top+'px';
		 mark.style.display='block';
		 
         preDe_w();//---------------------禁止页面滚动
		 css(mark,'opacity',100);
		 f_colse();
		 t=setTimeout(function()
		 {
			linear(mark,'opacity',0,2,function()
			{
			   mark.style.display='none';
			   clearTimeout(t);	
				preDe_w2(); //---------------------禁止页面滚动
			});
		  },2000);
		   
	   }else
	   {
		  alert('您没有输入内容或者文字超出范围'); 
		  return false;
	   }
	   
   }//提交评论
  })();/*-----------用户评论-----------------*/

  (function(){
	  
	 var but_top=aIcon[4];
	 var re_top=0,t=null;
	 window.onscroll=function()
	 {
		 re_top=scr_top();
		 if(re_top>200)
		 {
			but_top.style.display='block';
			linear(but_top,'opacity',100,1);
		 } 
		 else
		 {
			linear(but_top,'opacity',0,1,function()
			{
				but_top.style.display='none';
			}); 
		 } 
	 }//显示回到顶部按钮
	 but_top.onclick=function()
	 {
	   t=setInterval(function()
	   {
		 var scr_topVal=document.body.scrollTop ||document.documentElement.scrollTop;
		 scr_topVal-=20;
		  window.scrollTo(0,scr_topVal);
		  if(scr_topVal<=0)
		  {
			  clearInterval(t);
		} 
	   },20);   
	 }//回到顶部
  })();//-------------------------------------点击回到顶部
  
  
  
  
}