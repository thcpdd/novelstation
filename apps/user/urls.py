from django.urls import path
from .views import *

app_name = 'user'
urlpatterns = [
    path('userinfo/<str:active>', UserCenterView.as_view(), name='user'),  # 用户中心
    path('register', RegisterView.as_view(), name='register'),  # 注册
    path('active/<str:token>', ActiveUserView.as_view(), name='active'),  # 激活用户
    path('login', LoginView.as_view(), name='login'),  # 登录
    path('logout', LogoutView.as_view(), name='logout'),  # 退出登录
    path('forgot', ForgotPasswordView.as_view(), name='forgot'),  # 忘记密码
    path('reset', ResetPasswordView.as_view(), name='reset'),  # 重置密码
    path('message', UserMessageView.as_view(), name='message'),  # 我的消息
    path('collect', UserCollectView.as_view(), name='collect'),  # 我的收藏
]
