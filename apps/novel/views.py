from django.shortcuts import render
from django.views import View
from .models import NovelsRotation, NovelsInfo, NovelsType, AuthorInfo, NovelChapters
from db.base_model import MyPaginator
from ..comment.models import Comment
from cn2an import cn2an  # pip install cn2an -U


class SortedTitles:
    chinese_numbers = '零一二三四五六七八九十百千万'
    math_numbers = '0123456789'

    @classmethod
    def get_number(cls, chars):
        """提取字符串中的数字（中文、阿拉伯）"""
        result = ''
        for char in chars:
            if char == ' ' or char == '，' or char == '章' or char == '回' or char == '.':
                break
            if char in cls.chinese_numbers:
                result += char
            elif char in cls.math_numbers:
                result += char

        return result if result else ''

    @classmethod
    def sorted_titles(cls, chapters_object_list):
        """为小说标题排序"""
        for chapter in chapters_object_list:
            math_number = cls.get_number(chapter.title)
            if not math_number:
                number = 0
            else:
                try:
                    number = math_number if math_number.isdigit() else cn2an(math_number, "normal")
                except ValueError:
                    number = 0
                    print('错误', chapter.title)
            chapter.key = int(number)

        for chapter in sorted(chapters_object_list, key=lambda x: x.key):
            yield chapter


class IndexView(View):
    @staticmethod
    def get(request):
        # 轮播图
        rotations = NovelsRotation.objects.all()
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()
        # 特别推荐
        recommends = NovelsInfo.objects.order_by('-collections')
        # 最新上架
        new_novels = NovelsInfo.objects.order_by('-create_time')
        # 热门作家
        hot_authors = AuthorInfo.objects.order_by('-fans')
        # 热销书籍
        hot_sales = NovelsInfo.objects.order_by('-sales')

        context = {
            'rotations': rotations,
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'recommends': recommends,
            'new_novels': new_novels,
            'hot_authors': hot_authors,
            'hot_sales': hot_sales,
        }

        return render(request, 'novels/index.html', context)


class NovelDetailView(View):
    @staticmethod
    def get(request, novel_id):
        chapter_page = request.GET.get('chapter_page')
        comment_page = request.GET.get('comment_page')

        # 本页对应的小说
        novel = NovelsInfo.objects.get(id=novel_id)
        # novel.create_time.time()
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()
        # 最新上架
        new_novels = NovelsInfo.objects.order_by('-create_time')
        # 小说标题
        chapters = NovelChapters.objects.filter(novels_info_id=novel_id)
        chapters = SortedTitles.sorted_titles(chapters)
        chapters_paginator = MyPaginator(list(chapters), 10)

        chapters_pages = chapters_paginator.page(chapter_page)
        chapters_pages.my_page_range = chapters_paginator.show_part_page_range(chapter_page, 8)  # 最多显示八页

        # 小说评论
        comments = Comment.objects.filter(novel_info_id=novel_id).order_by('-create_time')

        comments_paginator = MyPaginator(list(comments), 3)
        comments_pages = comments_paginator.page(comment_page)
        comments_pages.my_page_range = comments_paginator.show_part_page_range(comment_page, 8)

        context = {
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'novel': novel,
            'new_novels': new_novels,
            'chapters_pages': chapters_pages,
            'comments_pages': comments_pages,
            'active': novel.novels_type.logo,
            'chapter_page': chapter_page,
            'comment_page': comment_page,
            'key': (int(chapter_page) - 1) * 10
        }

        return render(request, 'novels/detail.html', context)

    @staticmethod
    def post(request, novel_id):
        from django.http import JsonResponse
        from django_redis import get_redis_connection

        if not request.user.is_authenticated:
            return JsonResponse({'success': 0, 'errmsg': '用户未登录'})

        try:
            NovelsInfo.objects.get(id=novel_id)
        except NovelsInfo.DoesNotExist:
            return JsonResponse({'success': 0, 'errmsg': '小说不存在'})

        connect = get_redis_connection()
        collect_id = f'collect_{request.user.id}'

        user_collect_novels_list = connect.lrange(collect_id, 0, connect.llen(collect_id))
        user_collect_novels_list = map(lambda x: x.decode(), user_collect_novels_list)

        if str(novel_id) in user_collect_novels_list:
            return JsonResponse({'success': 0, 'errmsg': '你已经收藏这本小说了'})

        connect.lpush(collect_id, novel_id)
        novel = NovelsInfo.objects.get(id=novel_id)
        novel.collections += 1
        novel.save()
        return JsonResponse({'success': 1, 'msg': '加入收藏成功'})


class ReadChapterView(View):
    @staticmethod
    def get(request, novel_id, page):
        from urllib.parse import unquote
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()

        chapters = NovelChapters.objects.filter(novels_info_id=novel_id)
        chapters = SortedTitles.sorted_titles(chapters)

        paginator = MyPaginator(list(chapters), 1)
        pages = paginator.page(page)
        chapter_id = pages.object_list[0].id

        chapter = NovelChapters.objects.get(id=chapter_id)
        content_path = unquote(chapter.content.url[1:])
        contents = (line for line in open(content_path, 'r', encoding='utf-8'))
        next(contents)

        context = {
            'pages': pages,
            'chapter': chapter,
            'contents': contents,
            'hot_novels': hot_novels,
            'novels_types': novels_types
        }
        return render(request, 'novels/read.html', context)


class NovelsListView(View):
    @staticmethod
    def get(request, sort, page):
        if sort == 'all':
            novels_type = 'all'
            novels = NovelsInfo.objects.all()
        else:
            # 该类型的小说
            novels_type = NovelsType.objects.get(logo=sort)
            novels = NovelsInfo.objects.filter(novels_type_id=novels_type.id)
        # 热门小说
        hot_novels = NovelsInfo.objects.order_by('-watcher')[:3]
        # 小说类型
        novels_types = NovelsType.objects.all()

        paginator = MyPaginator(novels, 8)
        pages = paginator.page(page)
        pages.my_page_range = paginator.show_part_page_range(page, 8)

        context = {
            'pages': pages,
            'hot_novels': hot_novels,
            'novels_types': novels_types,
            'novels_type': novels_type,
            'sort': sort,
            'active': sort
        }
        return render(request, 'novels/list.html', context)
