// 回到顶部
window.onscroll = function () {
  if (scrollY >= 800) {
      btn.style.display = 'block';
  } else {
      btn.style.display = 'none';
  }
}
btn.onclick = function () {
      var y = scrollY;
      if (y <= 0) {
          clearInterval(btn.timer);
          // 已经把定时器清除掉，下次点击可以在创建定时器
      }
      scrollTo(0,0);
}


// 登录注册
var btn_login = document.querySelector("#login")

$(btn_login).click(function(){
  window.location.href = './login.html'
})

// 导航条
getList()

function getList() {
  $.ajax({
    url: '../lib/nav_top.json',
    dataType: 'json',
    success: function (res) {
      // console.log(res)

      // 4-1. 准备一个空字符串
      let str = ''

      // 4-2. 渲染一级的 li
      res.forEach(item => {
        str += `<li>${item.name}</li>`
      })

      // 4-3. 填充到 nav_top 里面的 ul 里面
      $('.header-nav > ul')
        .html(str)
        .on({
          mouseenter: () => $('.nav_box').stop().slideDown(),
          mouseleave: () => $('.nav_box').stop().slideUp()
        })
        .children('li') // 找到所有的一级菜单下的 li
        .on('mouseover', function () {
          // 5-1. 知道自己移入的时哪一个 li
          const index = $(this).index()
          // 5-2. 找到要渲染的数组
          const list = res[index].list
          // 5-3. 用我们找到的数组把 nav_box 位置渲染了就可以了
          let str = ''

          // 5-4. 进行组装
          list.forEach(item => {
            str += `
                  <li>
                    <div>
                      <img src="${ item.list_url}" alt="">
                    </div>
                    <p class="title">${ item.list_name}</p>
                    <span class="price">${ item.list_price}</span>
                  </li>
                `
          })

          // 5-5. 填充到页面里面
          $('.nav_box > ul').html(str)
        })

      // 4-4. 给 nav_box 添加一个移入移出事件
      $('.nav_box')
        .on({
          mouseover: function () { $(this).finish().show() },
          mouseout: function () { $(this).finish().slideUp() }
        })
    }
  })
}

  // 搜索框点击下拉菜单
   // search
   var sInfo = ["小米9", "Redmi K20 Pro", "Redmi K20", "Redmi Note7 Pro", "Redmi Note7", "小米电视4c", "电视32英寸", "笔记本pro", "小爱音响", "净水器"];
   // 搜索框部分获取焦点、失去焦点的效果
   $(".header-search form input").focus(function () {
       // 信息渲染
       for (var i = 0; i < sInfo.length; i++) {
           $(".header-search form p a").eq(i).text(sInfo[i]);
       }
       $(".header-search form").css({ border: "1px solid #ff6700" }).children("button").css({ borderLeft: "1px solid #ff6700" }).siblings(".m1").fadeOut(100, "linear").siblings("p").css({ display: "flex" });

   })
   $(".header-search form input").blur(function () {
       $(".header-search form").css({ border: "1px solid #e0e0e0" }).children("button").css({ borderLeft: "1px solid #e0e0e0" }).siblings(".m1").fadeIn(100, "linear").siblings("p").css({ display: "none" });
   })



// 轮播图纵向导航条

function getList2() {

  $.ajax({
    // 获取数据：
    url: "../lib/nav.json",
    dataType: "json",

    // 渲染
    success: function (res) {
      // console.log(res)
      let str1 = "";
      res.forEach(ele => {
        str1 += `<li>${ele.name}</li>`

        $(".site-category")
          .html(str1)
          .children("li")
          .on({
            mouseenter: () => $(".ban_box").css("display", "block"),
            mouseleave: () => $(".ban_box").css("display", "none")
          })
          .on("mouseover", function () {
            let index = $(this).index()
            // console.log(index)
            let list = res[index].list
            let str2 = ""
            list.forEach(ele => {
              str2 += `<li><img
                  src=${ele.list_src}
                  alt="">
                  <span>${ele.list_name}</span></li>`
            })
            $(".ban_box>ul").html(str2)
          })
      })
      $(".ban_box")
        .on({
          mouseenter: () => $(".ban_box").css("display", "block"),
          mouseleave: () => $(".ban_box").css("display", "none")
        })
    }

  })

}
getList2()


// 给所有的main下的li绑定一个点击事件
$('main .page-main ul').on('click','li',function(){
  window.location.href = './list.html'
  console.log(1);
})

// 小米闪购
function shanggou() {
  $.ajax({
    url: "../lib/xiaomishanggou.json",
    dataType: "json",
    success: function (res) {
      let str = ""
      res.forEach(function (ele) {
        str += ` <div class="swiper-slide">
            <div class="img">
                <img src="${ele.src}" alt="">
            </div>
            <p class="name">${ele.name}</p>
            <p class="text">${ele.desc}</p>
            <p><mark>${ele.price}</mark><i>${ele.price}元</i></p>
        </div>`
      })
      $("main .page-main .container .swiper-wrapper").html(str)

    }

  })
}
shanggou()

// 手机
function phone() {
  $.ajax({
    url: "../lib/phone.json",
    dataType: "json",
    success: function (res) {
      let str = ""
      res.forEach(function (ele) {
        str += `<li><a href="#">
            <div class="figuer_img">
                <img src="${ele.src}"
                    alt="">
            </div>
            <h3 class="title">
            ${ele.name}
            </h3>
            <p class="desc">${ele.desc}</p>
            <p class="price"><span class="num">${ele.price}</span>元<span>起</span>
            </p>
        </a></li>`
      })
      // console.log(str)
      $(".span4>ul").html(str)
    }
  }).then(function () {
    // console.log($(".body>.shangou>section>.img>li"))
  })
}
phone()

// 家电 
function appliances() {
  $.ajax({
    url: "../lib/appliances.json",
    dataType: "json",
    success: function (res) {
      res.forEach((ele, index) => {
        let str = ""
        ele.list.forEach((item, index) => {
          if (index == 0 || index == 5) {
            str += `<li> <img src="${item.list_src}" alt=""> </li>`;
          }
          else if (index == 9) {

            str += `<li>
              <div  class="figuer_img">
                <img src="${item.list_src}" alt="">
                <div>
                  <h3  class="title">${item.list_name}</h3>
                  <p class="price"><span class="num">${item.list_price}</span>元<span>起</span>
                                    </p>
                  
                </div>
              </div>`;
          }
          else if (index === 10) {

            str += `<div><h3>${item.list_name}</h3><h4>${item.list_desc}</h4></div></li>`;
          }
          else {
            str += `
              <li>
                  <div class="figuer_img">
                      <img src="${item.list_src}" alt="">
                  </div>
                  <h3 class="title">
                  ${item.list_name}
                  </h3>
                  <p class="desc">${item.list_desc}</p>
                  <p class="price"><span class="num">${item.list_price}</span>元<span>起</span>
                  </p>
              </li>
   `;
          }
        })
        $(`.row3>.span5>ul`).html(str)
      })
    }
  }).then(function () {
    $(".home-brick-box .box-hd1 a").mouseover(function () {
      $(this).addClass('active').siblings().removeClass('active');//给我看看效果
      $('.home-brick-box .row3').eq($(this).index()).addClass("show").siblings().removeClass("show");//ok
    })
  })
}
appliances()


// 影音 
function moive() {
  $.ajax({
    url: "../lib/moive.json",
    dataType: "json",
    success: function (res) {
      res.forEach((ele, index) => {
        let str = ""
        ele.list.forEach((item, index) => {
          if (index == 0 || index == 5) {
            str += `<li> <img src="${item.list_src}" alt=""> </li>`;
          }
          else if (index == 9) {

            str += `<li>
              <div  class="figuer_img">
                <img src="${item.list_src}" alt="">
                <div>
                  <h3  class="title">${item.list_name}</h3>
                  <p class="price"><span class="num">${item.list_price}</span>元<span>起</span>
                 </p>
                  
                </div>
              </div>`;
          }
          else if (index === 10) {

            str += `<div><h3>${item.list_name}</h3><h4>${item.list_desc}</h4></div></li>`;
          }
          else {
            str += `
              <li>
                  <div class="figuer_img">
                      <img src="${item.list_src}" alt="">
                  </div>
                  <h3 class="title">
                  ${item.list_name}
                  </h3>
                  <p class="desc">${item.list_desc}</p>
                  <p class="price"><span class="num">${item.list_price}</span>元<span>起</span>
                  </p>
              </li>
   `;
          }
        })
        $(`.moive>.span5>ul`).html(str)
      })
    }
  }).then(function () {
    $(".home-brick-box .box-hd1 a").mouseover(function () {
      $(this).addClass('active').siblings().removeClass('active');
      $('.home-brick-box .moive').eq($(this).index()).addClass("show").siblings().removeClass("show");//ok
    })
  })
}
moive()