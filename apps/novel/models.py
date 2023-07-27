from django.db import models
from db.base_model import BaseModel
from ..user.models import MyUser


class NovelsType(BaseModel):
    name = models.CharField('类型名', max_length=20, null=False)
    logo = models.CharField('类型标记', max_length=20, default='')

    class Meta:
        verbose_name = '小说类型'
        verbose_name_plural = verbose_name
        db_table = 'novels_type_table'

    def __str__(self):
        return self.name


class AuthorInfo(BaseModel):
    name = models.CharField('作者名字', max_length=20, null=False)
    plays = models.IntegerField('作品总数', default=0)
    fans = models.IntegerField('粉丝总数', default=0)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE, verbose_name='用户')

    class Meta:
        verbose_name = '作者信息'
        verbose_name_plural = verbose_name
        db_table = 'author_info_table'

    def __str__(self):
        return self.name


class NovelsInfo(BaseModel):
    title = models.CharField('小说标题', max_length=30)
    description = models.TextField('小说简介')
    watcher = models.IntegerField('总观看数', default=0)
    words = models.IntegerField('总字数', default=0)
    collections = models.IntegerField('总收藏数', default=0)
    comments = models.IntegerField('总评论数', default=0)
    chapters = models.IntegerField('总章节', default=0)
    sales = models.IntegerField('总销量', default=0)
    is_end = models.BooleanField('是否完结', default=False)
    image = models.ImageField('小说封面', upload_to='novels_image/')
    author_info = models.ForeignKey(AuthorInfo, on_delete=models.CASCADE, verbose_name='作者')
    novels_type = models.ForeignKey(NovelsType, on_delete=models.CASCADE, verbose_name='类型')

    class Meta:
        verbose_name = '小说信息'
        verbose_name_plural = verbose_name
        db_table = 'novels_info_table'

    def __str__(self):
        return self.title


class NovelChapters(BaseModel):
    title = models.CharField('章节名', max_length=50)
    content = models.FileField('章节内容', upload_to='novels/')
    novels_info = models.ForeignKey(NovelsInfo, on_delete=models.CASCADE, verbose_name='关联的小说')

    class Meta:
        verbose_name = '小说章节'
        verbose_name_plural = verbose_name
        db_table = 'novel_chapters_table'

    def __str__(self):
        return self.title


class NovelsRotation(BaseModel):
    name = models.CharField('名称', max_length=10)
    image = models.ImageField('图片', upload_to='rotations/')

    class Meta:
        verbose_name = '首页小说轮播图'
        verbose_name_plural = verbose_name
        db_table = 'novels_rotation_table'

    def __str__(self):
        return self.name
