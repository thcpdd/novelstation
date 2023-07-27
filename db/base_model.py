from django.db import models
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


class BaseModel(models.Model):
    create_time = models.DateTimeField('创建时间', auto_now_add=True)
    update_time = models.DateTimeField('修改时间', auto_now=True)
    is_delete = models.BooleanField('删除标记', default=False)

    class Meta:
        abstract = True


class MyPaginator:
    def __init__(self, *args, **kwargs):
        self.paginator = Paginator(*args, **kwargs)

    def page(self, number):
        try:
            pages = self.paginator.page(number)
        except EmptyPage:
            pages = self.paginator.page(self.paginator.num_pages)
        except PageNotAnInteger:
            pages = self.paginator.page(1)

        return pages

    def show_part_page_range(self, current_page, num_pages=8):
        """最多只显示num_pages页"""
        around_page = int(num_pages / 2)
        start = int(current_page) - around_page
        if num_pages % 2 != 0:
            end = int(current_page) + around_page + 1
        else:
            end = int(current_page) + around_page
        if start <= 0:
            start = 1

        if end > self.paginator.num_pages:
            end = self.paginator.num_pages + 1

        return range(start, end)
