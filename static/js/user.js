// 获取Cookie值的函数
function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// 判断请求是否是安全的函数
function csrfSafeMethod(method) {
    return /^(GET|HEAD|OPTIONS|TRACE)$/.test(method);
}

// 获取CSRF令牌的值
var csrfToken = getCookie('csrftoken');

// 添加CSRF令牌到请求头部
var set_csrf_header = function()  {
    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader('X-CSRFToken', csrfToken);
            }
        }
    });
}

