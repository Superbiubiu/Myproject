    // 1. 获取 localStorage 里面的数据
    const info = JSON.parse(localStorage.getItem("goods_info"))
    // 这个info能打印出来吗？不能，goods_info报错“
    // console.log(info);
    

    // 2. 判断数据是否存在
    if (!info) {
      // 能执行表示 !info 是一个 true
      // 表示 info 是一个 false
      // 表示数据不存在
      alert('您要查看的数据不存在')
      // 跳转回列表页面
      window.location.href = './list.html'
      console.log(info);
    }

    // 3. 渲染页面
    bindHtml()
    function bindHtml() {
      $('.goodsInfo img').attr('src', info.url)
      $('.goodsInfo .goodsName').text(info.title)
      $('.goodsInfo .price').text('现价: ' + info.price_new)
      $('.goodsInfo .price_old').text('原价: ' + info.price_old)
    }

  
    // console.log(info)

    // 4. 点击添加购物车
    // 4-1. 添加点击事件
    $('.addCart').click(() => {
      // console.log('我要添加购物车了')

      // 4-2. 判断是否登录

      // 4-3. 加入到购物车数组里面
      //    先拿到 localStorage 里面的那个数组信息
      //    如果原先没有数据, 那么我就用一个空数组来代替
      //    如果有数据, 就用我们的数据
      const cartList = JSON.parse(localStorage.getItem('cartList')) || []
      // 这是要哪个的 
    // 在和的呀
      console.log(cartList);

      // 象数组里面把本条数据添加进去
      // 4-4. 判断有没有这个数据
      //      每一个数据都有一个自己的 id
      //      只要看数组里面有没有 id 一样的数据, 就知道有没有这个数据了
      //      数组常用方法有一个叫做 some 的方法
      //      返回值:
      //        true: 表示数组里面有这个信息
      //        false: 表示数组里面没有这个信息
      // console.log(1);
      
      let exits = cartList.some(item => {
        // 数组里面每一个的 id === 本页面的这条数据的 id
        return item.id*1 === info.id*1
        
        
      })
      if (exits) {
        // 表示有这个信息了, 我们要让 number ++
        // console.log('已经存在 number ++')
        // 找到这个信息给他 number ++
        let data = null
        for (let i = 0; i < cartList.length; i++) {
          if (cartList[i].goodsId === info.goodsId) {
            data = cartList[i]
            break
          }
        }
        // data 就是我找到的这个信息
        data.number++

        // 4-5. 数量添加的时候, 小计价格要改变
        data.xiaoji = data.number * data.price_new // 数量 * 单价
      } else {
        // 表示没有这个信息, 直接 push 就可以了
        // push 之前, 象里面添加一个 number 信息为 1
        info.number = 1

        // 4-5. 多添加一些信息
        info.xiaoji = info.price_new // 因为默认是第一个, 小计就是单价
        info.isSelect = false // 默认不选中
        cartList.push(info)
      }

      // 在存储到 localStorage 里面
      localStorage.setItem('cartList', JSON.stringify(cartList))
    })

    // 5.添加直接购买跳转到购物车页面
    $('.Cart').click(()=>{
        window.location.href = './cart.html'
    })