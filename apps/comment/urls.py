from django.urls import path
from .views import *


app_name = 'comment'

urlpatterns = [
    path('', CommentView.as_view(), name='comment'),
]
