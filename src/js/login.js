window.onload = function () {
    $(".box>p span").click(function () {
        $(this).css({ color: "#f56600" }).siblings("span").css({ color: "#666" })
        $(".box>div").eq($(this).index()).css({ display: "flex" }).siblings("div").css({ display: "none" });
    });
    $(".box div:nth-of-type(1) input").focus(function () {
        $(this).css({ borderColor: "#ff6700" });
    });
    $(".box div:nth-of-type(1) input").blur(function () {
        $(this).css({ borderColor: "#e0e0e0" });
    });


    function returnDefault(e) {
        var e = e || event;
        return e.preventDefault();
    }

    function setCookie(key, value, expires) {
        if (expires) {
            let d = new Date();
            let t = d.setTime(d.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires);
            document.cookie = `${key}=${value};expires=${t}`;
        } else {
            document.cookie = `${key}=${value}`;
        }
    }

    function getCookie(key) {
        let str = document.cookie;
        let arr = str.split("; ");
        for (let i = 0; i < arr.length; i++) {
            let newArr = arr[i].split("=");
            if (key === newArr[0]) {
                return newArr[1];
            }
        }
    }

    let uReg = /^\w{1,6}$/;
    let pReg = /^\w{1,12}$/;
    let flag = false;
    let newFlag = false;
    $("input[name=name]").blur(() => {
        if (pReg.test($("input[name=name]").val())) {
            flag = true;
        } else {
            $(".box div:nth-of-type(1) i").text("您输入的用户名不合法");
            flag = false;
        }
    });
    $("input[name=pwd]").blur(() => {
        if (pReg.test($("input[name=pwd]").val())) {
            newFlag = true;
        } else {
            $(".box div:nth-of-type(1) i").text("您输入的用户名不合法");
            newFlag = false;
        }
    });
    $("button:eq(1)").click((e) => {
        returnDefault(e);
        if (flag && newFlag) {
            $.ajax({
                url: "/gx",
                dataType: "text",
                data: {
                    username: `${$("input[name=name]").val()}`,
                    password: `${$("input[name=pwd]").val()}`
                },
                success: function (res) {
                    alert(res);
                    // 这个能打，弹窗可以  ？？怎么会这样
                    // 你这个不是要注册吗
                    // 注册成功了才返回东西
                    // 你后端怎么写的
                    // 后端老师封装好了
                    // 那你现在能注册吗不能，直接跳过去不判断？？zj
                    console.log(res);
                }
            })
        } else {
            alert("请输入合法用户名和密码");
        }
        location.href = './index.html'
    });
    $("button:eq(0)").click((e) => {
        returnDefault(e);
        // 那你这个判断又是什么意思啊？？什么，判断账号密码是否为false？？
        if (flag && newFlag) {
            // 你这个ajax又是什么意思啊
            $.ajax({
                // 这个呀 发送ajax请求啊
                // 发送请求的目的是啥呀拿数据库数据，判断是否一直
                url: "/gx2",
                dataType: "text",
                data: {
                    username: `${$("input[name=name]").val()}`,
                    password: `${$("input[name=pwd]").val()}`
                },
                success: function (res) {
                    // 这个呢，打印一下
                    alert(res);
                    console.log(res);
                    
                }
            })
        } else {
            alert("用户名和密码不能为空");
        }
        // 这不是首页，改一下也是这样，咦，不跳了？fan李哥，我试试正确的账号，还是报错
        location.href='./cart.html'

        // 你的代码在这里就跳了，下面的代码都还没执行，跳到那边，那边怎么从cookie里面拿账号和秘密，没有账号和密码，然后就返回会登录页了  拿把他放到前面？
    });


    // 这个什么意思啊，判断密码是否正确，不正确就提示错误，正确就跳转
    var errorInfo = document.querySelector('.span')

    // 4. 发送请求
    //   把用户名和密码发送到后端
    // 4-1. 创建 ajax 对象
    // 还有这个   这个就是复制老师的 那上面那个呢  大的上面只是判断正则 
    var xhr = new XMLHttpRequest()
    // 那这个请求目的又是什么意思啊
    // 这个？？
    // 4-2. 配置本次请求的信息
    xhr.open('POST', './login.php')

    // 4-3. 接受响应
    xhr.onload = function () {
        var res = JSON.parse(xhr.responseText)

        if (res.code === 0) {
            // 提示错误
            // alert('用户名或密码错误')
            // 让这个 span 标签显示出来就可以了
            errorInfo.style.display = 'block'
        } else {
            window.location.href = './cart.html'
        }

    }

    // 4-4. 设置请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

    // 4-5. 发送请求
    //      在 () 里面携带参数
    // xhr.send('username=' + uname + '&password=' + upass)
    xhr.send(`username=${uname}&password=${upass}`)



}