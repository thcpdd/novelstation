from django.db import models
from db.base_model import BaseModel
from ..user.models import MyUser
from ..novel.models import NovelsInfo


class Message(BaseModel):
    MESSAGE_TYPE_CHOICE = (
        (0, '系统'),
        (1, '评论'),
    )

    MESSAGE_TYPE_DICT = {
        '0': '系统',
        '1': '评论'
    }

    title = models.CharField('消息标题', max_length=30)
    content = models.TextField('消息内容')
    message_type = models.CharField('消息类型', choices=MESSAGE_TYPE_CHOICE, default=0, max_length=10)
    user_info = models.ForeignKey(MyUser, verbose_name='所属用户', on_delete=models.CASCADE)

    class Meta:
        verbose_name = '消息'
        verbose_name_plural = verbose_name
        db_table = 'message_table'

    def __str__(self):
        return self.title


class Comment(BaseModel):
    content = models.TextField('评论内容')
    user_info = models.ForeignKey(MyUser, verbose_name='所属用户', on_delete=models.CASCADE)
    novel_info = models.ForeignKey(NovelsInfo, verbose_name='所属小说', on_delete=models.CASCADE)

    class Meta:
        verbose_name = '评论'
        verbose_name_plural = verbose_name
        db_table = 'comment_table'

    def __str__(self):
        return f'{self.user_info.username}对{self.novel_info.title}的评论信息'
