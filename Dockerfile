FROM python:3.10
LABEL "author"="Rainbow"
COPY . /web/NovelStation
WORKDIR /web/NovelStation
RUN pip install -r ./requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
CMD ["uwsgi", "--ini", "uwsgi.ini"]
