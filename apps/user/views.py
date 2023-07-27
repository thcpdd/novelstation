from django.shortcuts import render, redirect, reverse
from django.views import View
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from ..novel.models import NovelsInfo, NovelsType
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core import signing
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from .models import MyUser


class RegisterView(View):
    @staticmethod
    def get(request):
        return render(request, 'user/register.html')

    @staticmethod
    def post(request):
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        response = {
            'success': 0
        }

        for content in username:
            if u'\u4e00' <= content <= u'\u9fff':
                response['errmsg'] = '用户名不能包含中文'
                return JsonResponse(response)

        try:
            MyUser.objects.get(username=username)
            response['errmsg'] = '用户名已存在'
            return JsonResponse(response)
        except MyUser.DoesNotExist:
            user = MyUser.objects.create_user(username, email, password)
            user.is_active = False
            user.save()

            # 加密用户信息
            token = signing.dumps(user.id)
            request.session['token'] = token
            request.session.set_expiry(60 * 60 * 24)  # 设置缓存为24小时

            # 发送邮箱
            subject = '小说驿站-注册信息'
            from_email = settings.EMAIL_FROM
            html_msg = f'<h1>{username},欢迎您注册小说驿站会员</h1>请点击下面链接激活您的账号</br><a href="http://127.0.0.1:8000/' \
                       f'user/active/{token}">点此激活账号</a>'
            send_mail(subject, message='', from_email=from_email, recipient_list=[email], html_message=html_msg)

            response['success'] = 1
            response['msg'] = '注册成功'
            return JsonResponse(response)


class ActiveUserView(View):
    @staticmethod
    def get(request, token):
        from ..comment.models import Message
        try:
            session_token = request.session['token']
            if session_token != token:
                return HttpResponse('错误，令牌不匹配')

            user_id = signing.loads(token)
            user = MyUser.objects.get(id=user_id)
            user.is_active = True
            user.save()

            request.session.flush()

            Message.objects.create(
                title='注册成功信息',
                content='恭喜！您已经成功开通了账号。现在，开始您的阅读之旅吧！',
                user_info_id=user_id,
                message_type=0
            )

            return HttpResponse('激活成功')
        except KeyError:
            return HttpResponse('错误，请勿随意访问该页面')


class LoginView(View):
    @staticmethod
    def get(request):
        username = request.COOKIES.get('username')
        if username:
            return render(request, 'user/login.html', {'errmsg': '', 'username': username})
        return render(request, 'user/login.html', {'errmsg': '', 'username': ''})

    @staticmethod
    def post(request):
        username = request.POST.get('name')
        password = request.POST.get('pwd')
        cookie = request.POST.get('cookie')

        if not all([username, password]):
            return render(request, 'user/login.html', {'errmsg': '数据不完整'})

        user = authenticate(request, username=username, password=password)

        if not user:
            return render(request, 'user/login.html', {'errmsg': '用户名或密码错误'})

        if not user.is_active:
            return render(request, 'user/login.html', {'errmsg': '用户未激活'})

        login(request, user)
        next_url = request.GET.get('next', reverse('user:user', kwargs={'active': 'info'}))
        response = redirect(next_url)
        if cookie:
            response.set_cookie('username', username, max_age=14*24*3600)  # 缓存两星期
        else:
            response.delete_cookie('username')

        return response


class LogoutView(View):
    @staticmethod
    def get(request):
        logout(request)

        return redirect(reverse('novel:index'))


class ForgotPasswordView(View):
    @staticmethod
    def get(request):
        return render(request, 'user/forgot.html')

    @staticmethod
    def post(request):
        username = request.POST.get('username')
        email = request.POST.get('email')

        if not all([username, email]):
            return render(request, 'user/forgot.html', {'errmsg': '数据不完整'})

        try:
            user = MyUser.objects.get(username=username)

            from re import match
            if not match('^\\s*([a-zA-Z0-9][\\w.]{2,15})+@([a-zA-Z0-9]{2,5})+\\.([a-zA-Z0-9]{2,5})\\s*$', email):
                return render(request, 'user/forgot.html', {'errmsg': '邮箱格式不正确'})

            if user.email != email:
                return render(request, 'user/forgot.html', {'errmsg': '邮箱不匹配'})

            # 发送邮箱
            subject = '小说驿站-找回密码'
            from_email = settings.EMAIL_FROM
            from random import choices
            code = ''.join(choices(settings.CODE_CHARS, k=6))
            request.session['code'] = code
            request.session['user_id'] = user.id
            request.session.set_expiry(120)
            message = f'系统检测到您启用了找回密码功能，这个是验证码，请妥善保管，验证码将在2分钟后过期：{code}'

            send_mail(subject, message=message, from_email=from_email, recipient_list=[email])

            return redirect(reverse('user:reset'))

        except MyUser.DoesNotExist:
            return render(request, 'user/forgot.html', {'errmsg': '用户名不存在'})


class ResetPasswordView(View):
    @staticmethod
    def get(request):
        code = request.session.get('code')
        if not code:
            return HttpResponse('错误，你没有权限访问该网站')

        return render(request, 'user/reset.html')

    @staticmethod
    def post(request):
        # 会话中的验证码
        code = request.session.get('code')
        if not code:
            return render(request, 'user/reset.html', {'errmsg': '验证码已过期'})
        # 用户输入的验证码
        input_code = request.POST.get('ver')
        if input_code != code:
            return render(request, 'user/reset.html', {'errmsg': '验证码错误'})
        # 会话中的用户id
        user_id = request.session.get('user_id')
        try:
            user = MyUser.objects.get(id=user_id)
        except MyUser.DoesNotExist:
            return render(request, 'user/reset.html', {'errmsg': '用户不存在'})

        password = request.POST.get('password')

        if len(password) < 6:
            return render(request, 'user/reset.html', {'errmsg': '密码必须大于6位'})

        new_password = make_password(password)

        user.password = new_password
        user.save()

        request.session.flush()

        return redirect(reverse('user:login'))


class UserCenterView(LoginRequiredMixin, View):
    @staticmethod
    def get(request, active):
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()

        context = {
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'active': active
        }
        return render(request, 'user/userinfo.html', context)

    def post(self, request, active):
        params_dict = {
            'image': self.modify_image,
            'email': self.modify_email,
            'password': self.modify_password,
        }
        params = request.GET.get('class')
        user = MyUser.objects.get(id=request.user.id)

        return params_dict[params](request, user)

    @staticmethod
    def modify_image(request, user):
        """修改头像"""
        image = request.FILES.get('image')

        from imghdr import what
        if not what(image):
            return JsonResponse({'success': 0, 'errmsg': '非法图片文件，请刷新页面重新上传'})

        user.image = image
        user.save()

        return JsonResponse({'success': 1, 'msg': '头像更换成功'})

    @staticmethod
    def modify_email(request, user):
        """修改邮箱"""
        email = request.POST.get('email')
        from re import match
        if not match('^\\s*([a-zA-Z0-9][\\w.]{2,15})+@([a-zA-Z0-9]{2,5})+\\.([a-zA-Z0-9]{2,5})\\s*$', email):
            return JsonResponse({'success': 0, 'errmsg': '邮箱格式不正确'})

        user.email = email
        user.save()

        return JsonResponse({'success': 1, 'msg': '邮箱修改成功'})

    @staticmethod
    def modify_password(request, user):
        """修改密码"""
        old_pwd = request.POST.get('old_pwd')
        new_pwd = request.POST.get('new_pwd')

        if not authenticate(request, username=user.username, password=old_pwd):
            return JsonResponse({'success': 0, 'errmsg': '当前密码不正确'})

        if len(new_pwd) < 6:
            return JsonResponse({'success': 0, 'errmsg': '密码必须大于6位'})

        user.password = make_password(new_pwd)
        user.save()

        return JsonResponse({'success': 1, 'msg': '密码修改成功'})


class UserMessageView(LoginRequiredMixin, View):
    @staticmethod
    def get(request):
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()

        from db.base_model import MyPaginator
        from ..comment.models import Message

        page = request.GET.get('page')

        messages = Message.objects.filter(user_info_id=request.user.id).order_by('-create_time')

        paginator = MyPaginator(messages, 5)
        pages = paginator.page(page)
        pages.my_page_range = paginator.show_part_page_range(page)

        for message in pages.object_list:
            message.message_type_title = Message.MESSAGE_TYPE_DICT[message.message_type]

        context = {
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'active': 'active',
            'pages': pages,
            'page': page
        }

        return render(request, 'user/message.html', context)

    @staticmethod
    def delete(request):
        if not request.user.is_authenticated:
            return JsonResponse({'success': 0, 'msg': '用户未登录'})

        from ..comment.models import Message
        form_data = request.body.decode()
        if not form_data:
            messages = Message.objects.filter(user_info_id=request.user.id)
            messages.delete()
            return JsonResponse({'success': 1, 'msg': '消息删除成功'})

        message_id = form_data.split('=')[-1]

        try:
            message = Message.objects.get(id=message_id)
        except Message.DoesNotExist:
            return JsonResponse({'success': 0, 'msg': '消息不存在'})

        message.delete()

        return JsonResponse({'success': 1, 'msg': '消息删除成功'})


class UserCollectView(LoginRequiredMixin, View):
    @staticmethod
    def get(request):
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()

        from django_redis import get_redis_connection
        from db.base_model import MyPaginator

        connect = get_redis_connection()
        collect_id = f'collect_{request.user.id}'

        novels_ids = connect.lrange(collect_id, 0, connect.llen(collect_id))
        novels_ids = map(lambda x: x.decode(), novels_ids)

        user_collect_novels_list = [NovelsInfo.objects.get(id=novels_id) for novels_id in novels_ids]

        page = request.GET.get('page')
        paginator = MyPaginator(user_collect_novels_list, 4)
        pages = paginator.page(page)
        pages.my_page_range = paginator.show_part_page_range(page)

        context = {
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'active': 'active',
            'pages': pages,
            'page': page
        }

        return render(request, 'user/collect.html', context)

    @staticmethod
    def delete(request):
        if not request.user.is_authenticated:
            return JsonResponse({'success': 0, 'errmsg': '用户未登录'})

        from django_redis import get_redis_connection
        connect = get_redis_connection()

        form_data = request.body.decode()
        collect_id = f'collect_{request.user.id}'
        # 没有接收到小说id则清空整个列表
        if not form_data:
            connect.ltrim(collect_id, 1000, 1001)
            return JsonResponse({'success': 1, 'msg': '全部取消收藏成功'})

        novel_id = form_data.split('=')[-1]

        try:
            NovelsInfo.objects.get(id=novel_id)
        except NovelsInfo.DoesNotExist:
            return JsonResponse({'success': 0, 'errmsg': '该小说不存在'})

        connect.lrem(collect_id, 0, novel_id)

        return JsonResponse({'success': 1, 'msg': '取消收藏成功'})
