from django.urls import path
from .views import *


app_name = 'novel'

urlpatterns = [
    path('', IndexView.as_view(), name='index'),  # 首页
    path('novel/detail/<int:novel_id>.html', NovelDetailView.as_view(), name='detail'),  # 小说详情页
    path('novel/read/<int:novel_id>/<int:page>', ReadChapterView.as_view(), name='read'),  # 小说阅读页
    path('novel/list/<str:sort>/<int:page>', NovelsListView.as_view(), name='list'),  # 小说列表页
]
