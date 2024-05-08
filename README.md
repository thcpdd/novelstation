# 小说驿站

---

### 介绍

一个用来练手的Django项目。

访问地址：<a href="http://novelstation.rainbow.hi.cn">http://novelstation.rainbow.hi.cn</a>

项目完成时间：2023年7月26日

### 项目难点

1. 小说的存储

   对于一本小说的存储，我们应该是用一张表格存储这本小说的相关信息，例如作者、阅读量、章节量等。再用一张表来存储小说的章节信息，例如章节内容，章节关联的那本小说等。

   那么章节的内容应该如何保存呢？一种方式是之间将所有内容保存在一条表记录中的一个字段中，因为`MySQL`有专门的字段保存长文本。但是小说网站肯定会有很多小说，这样一来，整个数据库就会显得非常臃肿，备份起来也会变得十分麻烦。

   因此这里选择将小说章节保存在本地服务器中。当然，正式的网站不会把数据保存在服务器中，而是保存在一个文件系统中。

   这样每次只需要获取章节保存的路径，然后将章节内容读取返回就行了。

2. 小说章节排序

   为什么需要为小说章节排序呢？

   由于当前小说的数据是临时通过爬虫程序来获取并保存在数据库中的，并且是多任务爬虫，所以必将导致爬取的小说章节不是按顺序保存到数据库中的。而在查询一本小说的时候就要按顺序返回章节。所以才会有小说章节排序这个说法。

   对于小说排序，这里举一些的例子：

   ```python
   # 情况一
   chapter_titles = ['第2回', '第1回', '第6回']
   sorted_chapter_titles = sorted(chapter_titles, key=lambda title: int(title[1]))
   # 对于这种情况，我们可以使用 sorted 函数对小说章节名进行排序
   
   
   # 情况二
   chapter_titles = ['第2回', '第11回', '第6回']
   sorted_chapter_titles = sorted(chapter_titles, key=lambda x: int(re.findall(r'\d+', x)[0]))
   # 对于这种情况，我们也很容易可以联想到使用 sorted + 正则表达式 来提取数字来排序
   
   
   # 情况三
   chapter_titles = ['第二回', '第十一回', '第六回', '第三百二十回', '第两千零一回']
   # 对于这种情况，你是不是没辙了呢？哈哈哈。
   ```

   通过上述例子，我们可以看到小说的章节名的情况是非常多的，而且远远不止这些情况。

   对于情况三来说，可谓是把中华文化的博大精深表现得淋漓尽致。所以在这里你根本不知道从何下手。

   但是，万变不离其宗。我们通过观察发现，前两种情况都是把标题中的数字提取出来然后根据这些数字进行排序的。那对于情况三来说，我们是不是也可以这样做呢？

   答案肯定是可以的。

   既然不能提取到标准的阿拉伯数字，那我们能不能先将中式的数字给提取出来，然后将中式数字转换成阿拉伯数字呢？例如：章节名为 “第十一回”，我们将 “十一” 提取，然后将它转换成 “11”，那这样不就能排序了嘛？

   这样的做法听起来很简单，但是做起来是非常麻烦的一件事情。将 “十一” 进行转换，可能你第一个想到的是用一个字典来映射对应的值。但是，有一种情况：“两千零一十六”，请问这种情况阁下有如何应对呢？

   所以这样的转换是一个非常复杂的过程，涉及到非常多的算法。但是没有什么事情是百度不能解决的，我通过在百度上搜索相关内容，得知在 Python 中有一个包，专门负责将中文数字转成阿拉伯数字（果然没有什么是Python做不到的）。

   ```powershell
   pip install cn2an -U
   ```

   它的使用方式非常简单，只需要引入一个函数就可以了：

   ```python
   from cn2an import cn2an
   c_num = '两千零一十六'
   print(cn2an(c_num, "normal"))
   # >>> 2016
   ```

   所以我们现在要做的任务就是将章节名中的中文数字提取出来，然后交给这个包处理就行了。

   那么完整的逻辑位于：`/apps/novel/views.py`中的`SortedTitles`类。

   ```python
   class SortedTitles:
       chinese_numbers = '零一二三四五六七八九十百千万'
       math_numbers = '0123456789'
   
       @classmethod
       def get_number(cls, chars):
           """提取字符串中的数字（中文、阿拉伯）"""
           result = ''
           for char in chars:
               # 这里表示中文数字的结尾，真实项目可能会有更多情况
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
   ```

### 项目收获

1. 更加熟悉对数据库表结构的设计，例如：如何将一本小说保存到数据库中。
2. 对业务逻辑有更深层次的思考，例如：如何为小说章节标题排序。

### 项目展示

![](md-image/%E9%A6%96%E9%A1%B51.png)

![](md-image/%E9%A6%96%E9%A1%B52.png)

![](md-image/%E9%A6%96%E9%A1%B53.png)

![](md-image/%E9%A6%96%E9%A1%B54.png)

![](md-image/%E7%99%BB%E5%BD%95%E9%A1%B5.png)

![](md-image/%E6%B3%A8%E5%86%8C%E9%A1%B5.png)

![](md-image/%E6%89%BE%E5%9B%9E%E5%AF%86%E7%A0%81%E9%A1%B5.png)

![](md-image/%E4%B8%AA%E4%BA%BA%E8%B5%84%E6%96%99%E9%A1%B5.png)

![](md-image/%E4%BF%AE%E6%94%B9%E5%A4%B4%E5%83%8F%E9%A1%B5.png)

![](md-image/%E4%BF%AE%E6%94%B9%E9%82%AE%E7%AE%B1%E9%A1%B5.png)

![](md-image/%E4%BF%AE%E6%94%B9%E5%AF%86%E7%A0%81%E9%A1%B5.png)

![](md-image/%E6%88%91%E7%9A%84%E6%B6%88%E6%81%AF%E9%A1%B5.png)

![](md-image/%E6%88%91%E7%9A%84%E6%94%B6%E8%97%8F%E9%A1%B5.png)

![](md-image/%E5%B0%8F%E8%AF%B4%E5%88%86%E7%B1%BB%E9%A1%B5.png)

![](md-image/%E5%B0%8F%E8%AF%B4%E8%AF%A6%E6%83%85%E9%A1%B5.png)

![](md-image/%E5%B0%8F%E8%AF%B4%E7%AB%A0%E8%8A%82.png)

![](md-image/%E5%B0%8F%E8%AF%B4%E8%AF%84%E8%AE%BA.png)

![](md-image/%E7%AB%A0%E8%8A%82%E9%98%85%E8%AF%BB%E9%A1%B51.png)

![](md-image/%E7%AB%A0%E8%8A%82%E9%98%85%E8%AF%BB%E9%A1%B52.png)