// JavaScript Document
$(document).ready(function(e) {
 
	$('.regContent .account').find('label').click(function(){ $(this).siblings('input').focus();});
	$('.regContent .pass').find('label').click(function(){ $(this).siblings('input').focus();});
	$('.regContent .pass2').find('label').click(function(){ $(this).siblings('input').focus();});
	$('.regContent .old_pass').find('label').click(function(){ $(this).siblings('input').focus();});
	$('.regContent .email').find('label').click(function(){ $(this).siblings('input').focus();});
	$('.regContent .ver').find('label').click(function(){ $(this).siblings('input').focus();});
	/*获取焦点*/
	
	$('.regContent .account').find('p').css('display','block');//账号
	  var user_name=/^\s*([a-zA-Z0-9]){4,10}\s*$/;

	//   var user_name = /[^\u0000-\u00FF]/;
	   //简单匹配中文 /[\u4E00-\u9FA5\uF900-\uFA2D]/;匹配中文
	var user_pass=/^[a-zA-z0-9]{6,9}$/; 
	var user_email=/^\s*([a-zA-Z0-9]{2,10})+@([a-zA-Z0-9]{2,5}\.)+([a-zA-Z0-9]{2,5})\s*$/;
	//var user_email= /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var user_ver=/^[0-9a-zA-Z]{5}$/;
	var user_jihuo=/^[0-9a-zA-Z]{1,23}$/;
	var user_phone=/^[0-9\\-]{7,13}$/;
	var user_qq=/^\d{5,11}$/;
	var user_describe=/^\S{10,1000}$/;
	var user_answer=/^[\u4E00-\u9FA5\uF900-\uFA2D\w]{5,30}$/;
	
	 function regExp(element,re,info,yaoqou)
	 {
		element.blur(function()
	    {
		  var user_val=trim(element.val());
		  if(user_val=='')
		  {
			 $(this).eq(0).siblings('p').html('<image src="image/warn.png"><span>'+info+'</span></p>').css('color','#F00');
			 return false;
		  }
		  else
		  {
			  var user_name2=re.test(user_val);
			  
			  if(user_name2)
			  {
				   $(this).eq(0).siblings('p').html('<image src="image/yes.png">');
			  }
			  else
			  {
				  $(this).val('').focus();
				  $(this).eq(0).siblings('p').html('<image src="image/warn.png"><span>'+yaoqou+'</span>')
				  $(this).eq(0).siblings('p').css({color:'#f00'});
				  return false;
			  }
		  }
	 });
	 
	 element.focus(function()
	  {
		   $(this).eq(0).siblings('p').css('display','block');
		   $(this).eq(0).siblings('p').html('<i>*</i><span>'+yaoqou+'</span>');
		   $(this).eq(0).siblings('p').find('span').css('color','#666');
	  }); 
     }
	 regExp( $('.regContent .account').find('input'),user_name,'请输入用户名','4-10个字母、数字组合，例如abcd,abc123等');
	 regExp( $('.regContent .pass').find('input'),user_pass,'请输入密码','6-9个字符，区分大小写');
     regExp( $('.regContent .old_pass').find('input'),user_pass,'请输入密码','6-9个字符，区分大小写');
	 regExp( $('.regContent .email').find('input'),user_email,'请输入邮箱','请输入邮箱用于找回密码');
	 regExp( $('.regContent .email2').find('input'),user_email,'请输入邮箱','我们的答复会通过邮箱通知您');
	 regExp( $('.regContent .ver').find('input'),user_ver,'请输入验证码','');
	 regExp( $('.regContent .jihuo').find('input'),user_jihuo,'请输入验证码','');
	 regExp( $('.regContent .describe').find('textarea'),user_describe,'请填写您的问题','为了更好的解答您的问题,字符不得少于10个多于150个');
	 regExp( $('.regContent .problem3').find('input').eq(1),user_answer,'答案不得少于5个或超过30个字符','请填写正确的答案');

	
	  $('.regContent .pass2').find('input').blur(function()
	      {
		    var pass2=$(this).val();
			var pass=$('.regContent .pass').find('input').val();
			if(pass2=='')
			{
			 $(this).eq(0).siblings('p').html('<image src="image/warn.png"><span>请输入确认密码</span></p>').css('color','#F00');
			 return false;
			}
			else
			{
			  if(pass2===pass)	
			  {
				$(this).eq(0).siblings('p').html('<image src="image/yes.png">');
			  }
			  else
			  {
				  $(this).val('').focus();
				 
				  $(this).eq(0).siblings('p').html('<image src="image/warn.png"><span>两次密码不一致</span>')
				  $(this).eq(0).siblings('p').css({color:'#f00'});
				  return false; 
			  }
			}
		  });
	  $('.regContent .pass2').find('input').focus(function()
	      {
		   $(this).eq(0).siblings('p').css('display','block');
		  });//验证密码是否一致
	 
	/* $('.regContent .describe').find('textarea').blur(function()
	 {
		  var user_val=$('.regContent .describe').find('textarea').val();
		 
		  if(user_val=='')
		  {
			 $(this).eq(0).siblings('p').html('<image src="image/warn.png"><span>请填写您的问题</span></p>').css('color','#F00');
			 return false;
		  }
		  else
		  {
			  user_val=trim(user_val);
			  var user_name2=user_describe.test(user_val);
			  
			  if(user_name2)
			  {
				   $(this).eq(0).siblings('p').html('<image src="image/yes.png">');
			  }
			  else
			  {
				  $(this).val('').focus();
				  $(this).eq(0).siblings('p').html('<i><image src="image/warn.png"></i><span>为了更好的解答您的问题</span>')
				  $(this).eq(0).siblings('p').css({color:'#f00'});
				  return false;
			  }
		  }
	 });
	 
	 $('.regContent .describe').find('textarea').focus(function()
	  {
		  $(this).eq(0).siblings('p').css('display','block');
		   $(this).eq(0).siblings('p').html('<i>*</i><span>为了更好的解答您的问题</span>');
		   $(this).eq(0).siblings('p').find('span').css('color','#666');
	  });//问题描述*/
	  
		 function trim(str)
		 {
			return  str.replace(/\s/g,'');
	     }
      function number(element,re,info)
	  {
	    $(element).blur(function(){
			
			if($(this).val()!='')
			{
			
				var re_num=trim($(this).val());
				var re_num2=re.test(re_num);
				if(!re_num2)
				{
					//$(this).siblings('p').css('display','block');
					$(this).val('');
					$(this).siblings('p').prepend('<span class="red">'+info+'</span>');
					return false;
				}
				
			}
		});
	     $(element).focus(function()
		 {
			 $(this).siblings('p').children('.red').text('');
		     $(this).siblings('p').css({'display':'block'});
		 });
	  }
	  number('.regContent .phone input',user_phone,'请输入正确的电话号码或手机号');
	  number('.regContent .qq input',user_qq,'请输入正确的QQ号');
	  number('.regContent .problem input',user_answer,'答案不得少于5个或超过30个字符');
	  number('.regContent .problem2 input',user_answer,'问题或答案不得少于5个或超过30个字符');
	  



$('.ver .ver_img').click(function()
   {
	$(this).attr('src','php/ver.php?p='+Math.random());
	});//验证码

	
});

