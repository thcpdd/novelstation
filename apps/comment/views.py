from django.views import View
from django.http import JsonResponse
from .models import Comment, Message
from ..novel.models import NovelsInfo


class CommentView(View):
    @staticmethod
    def post(request):
        content = request.POST.get('content')
        novel_id = request.POST.get('novel_id')

        if not content:
            return JsonResponse({'success': 0, 'errmsg': '内容不能为空'})

        novel = NovelsInfo.objects.get(id=novel_id)
        # 添加评论信息
        Comment.objects.create(
            content=content,
            user_info_id=request.user.id,
            novel_info_id=novel_id
        )
        # 将评论消息发给作者对应的账号
        Message.objects.create(
            title=f'{request.user.username}评论了你的作品，快看看吧',
            content=content,
            user_info_id=novel.author_info.user.id,
            message_type=1
        )

        novel.comments += 1
        novel.save()

        return JsonResponse({'success': 1, 'msg': '评论成功'})
