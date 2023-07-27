// JavaScript Document
window.onload=function()
{
   (function(){
	    var box=document.getElementsByClassName('con')[0];
		var ali=box.getElementsByTagName('li');
		for(var i=0;i<ali.length;i++)
		{
			(function(){
			var aA=ali[i].getElementsByTagName('a');
			aA[1].onmouseover=function()
			{
				removeClass(aA[1],'icon_down');
				this.getElementsByTagName('span')[0].innerHTML='下载';
			}
			aA[1].onmouseout=function()
			{
				addClass(aA[1],'icon_down');
				this.getElementsByTagName('span')[0].innerHTML='';
			}
			aA[2].onmouseover=function()
			{
				removeClass(aA[2],'icon_down2');
				this.getElementsByTagName('span')[0].innerHTML='有声阅读';
			}
			aA[2].onmouseout=function()
			{
				addClass(aA[2],'icon_down2');
				this.getElementsByTagName('span')[0].innerHTML='';
			}}
			)()
		}
	})();//小图标切换
	
	(function(){
		var list_r=getClass(document,'div','list2')[0];
		var list_l=getClass(document,'div','list')[0];
		var r_h=wh(list_r).h;
		var l_h=wh(list_l).h;
		if(r_h>l_h)
		{
			css(list_l,'height',r_h);
		}
	})();//------------------------分页底部显示
}