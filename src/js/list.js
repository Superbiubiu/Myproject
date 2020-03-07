window.onload = function () {



    // 登录注册
    var btn_login = document.querySelector("#login")

    $(btn_login).click(function () {
        window.location.href = './login.html'
    })


    // 2-1. 准备一个变量
    var flag = true

    // 2-2. 准备一个变量接收数组
    var list2 = []


    var btn = document.querySelector('.sort')
    btn.onclick = function () {
        // 让准备好的变量改变
        flag = !flag

        // 不管是什么都要把数组重组

        list2.sort(function (a, b) {
            if (flag === true) {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        })

        $('.pagi').pagination({
            pageCount: Math.ceil(list2.length / 12), // 总页数
            current: 1, // 当前页
            jump: true,
            coping: true,
            homePage: '首页', // 首页按钮的文本
            endPage: '末页', // 末页按钮的文本
            prevContent: '上页',
            nextContent: '下页',
            callback: function (api) { // 当你切换页面的时候会触发
                // 拿数据去哪了
                let curr = api.getCurrent()
                //   dayinzhegekanx
                console.log(curr);

                console.log(curr)
                var list = list2.slice((curr - 1) * 12, curr * 12)
                // 3-2. 每次使用分页器切换的时候渲染一次
                bindHtml(list)
            }
        })

        // let data1 = slice(-2, 3) * 1

        // 3. 先把第一页的数据渲染一次
        bindHtml(list2.slice(0, 12))


    }

    let pros = [];
    let miPros = [];
    getList()

    function getList() {
        $.ajax({
            url: '../lib/list.json',
            dataType: 'json',
            success: function (res) {
                var lts = [
                    ["../images/lt1.webp", "../images/lt2.png", "../images/lt3.webp", "../images/lt4.webp", "../images/lt5.png", "../images/lt6.png"],
                    ["RedmiBook 13", "小米笔记本 Pro 15", "RedmiBook 14", "游戏本2019款", "小米笔记本 15.6'", "小米笔记本Air 17"],
                    ["4199元起", "5499元起", "3999元起", "6999元起", "3799元起", "3299元起"]
                ]
                // 头部下拉列表的效果与数据渲染
                pros = [res.miPros, res.rmPros, res.tvs, lts, res.miPros, res.rmPros, res.tvs];
                miPros = res.miPros;

                $('.pagi').pagination({
                    pageCount: Math.ceil(res.pus.length / 20), // 总页数
                    current: 1, // 当前页
                    jump: true,
                    coping: true,
                    homePage: '首页', // 首页按钮的文本
                    endPage: '末页', // 末页按钮的文本
                    prevContent: '上页',
                    nextContent: '下页',
                    callback: function (api) { // 当你切换页面的时候会触发
                        // api.getCurrent() 获取当前是第几页
                        // console.log(api.getCurrent())
                        let curr = api.getCurrent()

                        // console.log(curr)
                        // 根据是第几页, 从我的总数组里面筛选出一部分数据
                        //   slice 方法包前不包后
                        var list = res.pus.slice((curr - 1) * 20, curr * 20)
                        // console.log(list)
                        // slice 不改变原始数组, 只是从数组里面拿到一些内容
                        // splice 方法才是改变原始数组, 从原始数组里面删除

                        // 3-2. 每次使用分页器切换的时候渲染一次
                        bindHtml(list)


                    }
                })

                // 3. 先把第一页的数据渲染一次

                list2 = res.pus.slice(0, 100)
                // console.log(list2);

                bindHtml(list2)


            }

        })
    }

    function bindHtml(list) {
        // console.log(list);

        let str = ''

        // <a href="../index.html"></a>这样吗
        // console.log(list)
        list.forEach(item => {
            str += `
            
            <li data-id="${item.id}"><span></span><span></span><img src="${item.url}" alt=""><p>${item.title}</p><strong><i><b>${item.price_new}</b>元</i><i><b>${item.price_old}</b>元</i></strong><img src="${item.url}"></li>`
        })

        $('.box > ul').html(str)

        // console.log(str);





        // 跳转详情页
        $('.box > ul').on('click', 'li', function () {
            // console.log('我应该找到 list2 这个数组中 id 为 ' + data1 + ' 的那一条数据')
            const goodsid = $(this).attr('data-id');
            // const goodsId = this.getAttribute('data-id') * 1;
            let data = null;
            // list.forEach(item => {
            //     if(item.id == goodsid) {
            //         data = item;
            //         console.log('点击了这条数据' + item);                   
            //     }
            // })

            for (let index in list) {
                // console.log(item);
                if (list[index].id == goodsid) {
                    data = list[index];
                    // console.log( list[index]);  
                    break;
                }
            }

            localStorage.setItem('goods_info', JSON.stringify(data))
            console.log(data);


            //实现跳转
            location.href = './detail.html?' + JSON.stringify(data);

        })
    }

    // search
    var sInfo = ["小米9", "Redmi K20 Pro", "Redmi K20", "Redmi Note7 Pro", "Redmi Note7", "小米电视4c", "电视32英寸", "笔记本pro", "小爱音响", "净水器"];
    // 搜索框部分获取焦点、失去焦点的效果
    $(".header_bottom form input").focus(function () {
        // 信息渲染
        for (var i = 0; i < sInfo.length; i++) {
            $(".header_bottom form p a").eq(i).text(sInfo[i]);
        }
        $(".header_bottom form").css({ border: "1px solid #ff6700" }).children("button").css({ borderLeft: "1px solid #ff6700" }).siblings(".m1").fadeOut(100, "linear").siblings("p").css({ display: "flex" });

    })
    $(".header_bottom form input").blur(function () {
        $(".header_bottom form").css({ border: "1px solid #e0e0e0" }).children("button").css({ borderLeft: "1px solid #e0e0e0" }).siblings(".m1").fadeIn(100, "linear").siblings("p").css({ display: "none" });
    })

    $(".box>ul").on("mouseenter", "li", function () {
        $(this).children("span").fadeIn(400, "linear");
        $(".box>ul").on("mouseenter", "span", function () {
            if ($(this).index() === 0) {
                $(this).text("喜欢");
            } else {
                $(this).text("查看详情");
            }
        })
    })
    $(".box>ul").on("mouseleave", "li", function () {
        $(this).children("span").fadeOut(400, "linear");
        $(".box>ul").on("mouseleave", "span", function () {
            $(this).text("");
        })
    })

}