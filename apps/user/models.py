from django.db import models
from django.contrib.auth.models import AbstractUser
from db.base_model import BaseModel


class MyUser(AbstractUser, BaseModel):
    image = models.ImageField('用户头像', default='user/default.jpg', upload_to='user/')
    integral = models.IntegerField('积分', default=0)

    class Meta:
        verbose_name = '用户表'
        verbose_name_plural = verbose_name
        db_table = 'user_table'

    def __str__(self):
        return self.username
