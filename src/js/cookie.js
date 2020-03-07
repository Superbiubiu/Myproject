function setCookie(key, value, expires) {
  // key 就是你要设置的 cookie 的属性名
  // value 就是你要设置的 cookie 的属性值
  // expires 就是你要设置的 cookie 的过期时间


  // 判断以下你有没有传递 expires
  if (expires) {
    // 你传递了
    // 我就准备一个时间对象
    var time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)

    // 设置上
    document.cookie = key + '=' + value + ';expires=' + time
  } else {
    // 你没有传递
    // 直接设置就可以了
    document.cookie = key + '=' + value
  }
}

function getCookie(key) {
  // key 就是你要获取的那一条 cookie 的属性名

  // 1. 准备一个 str
  var str = ''

  // 2. 去到 document.cookie 里面找到对应的 key 的 value 赋值给 str
  // console.log(document.cookie) // 不好直接操作
  // 使用 split 方法切割以下
  var tmp = document.cookie.split('; ')
  // 循环遍历 tmp
  tmp.forEach(function (item) {
    // item 就是每一条 cookie
    // console.log(item)
    // item = 前面的就是每一条 cookie 的 key
    // item = 后面的就是每一条 cookie 的 value
    // 使用 split 方法把 item 切割
    var t = item.split('=')
    // console.log(t)
    // t[0] 就是每一条 cookie 的 key
    // t[1] 就是每一条 cookie 的 value
    // 判断
    if (t[0] === key) {
      str = t[1]
    }
  })

  // 3. 把 str 返回
  return str
}
