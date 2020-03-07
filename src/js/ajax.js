function postSend(url, cb, data) {
  // data 就是 post 请求的时候, 需要传递到后端的数据

  // 1. 创建 ajax 对象
  var xhr = new XMLHttpRequest()

  // 2. 配置请求信息
  xhr.open('POST', url)

  // 3. 接受响应
  xhr.onload = function () {
    // 调用 cb 函数把结果给出去
    cb(xhr.responseText)
  }

  // 4. 单独设置请求头
  xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

  // 5. 发送请求
  xhr.send(data)
}

function getSend(url, cb) {
  // cb 就是你传递进来的那个函数
  // 我要在请求成功的时候调用

  // 1. 创建 ajax 对象
  var xhr = new XMLHttpRequest()

  // 2. 配置请求信息
  xhr.open('GET', url)

  // 3. 接受响应
  xhr.onload = function () {
    // console.log(xhr.responseText)
    // 这里是请求成功了, 能拿到响应体了
    cb(xhr.responseText)
  }

  // 4. 发送请求
  xhr.send()
}
