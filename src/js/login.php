<?php

  // 1. 接受前端传递来的参数
  //    因为是 POST 请求, 就在 $_POST 里面获取
  $uname = $_POST['username'];
  $upass = $_POST['password'];

  // 2. 去数据库里面查询有没有这个数据了
  // 2-1. 连接数据库
  $link = mysqli_connect('localhost', 'root', 'root', 'test11');

  // 2-2. 执行 sql 语句
  $sql = "SELECT * FROM `login` WHERE `username`='$uname' AND `password`='$upass'";
  $res = mysqli_query($link, $sql);

  // 2-3. 解析结果
  //      因为是查询, 所以要解析结果
  $row = mysqli_fetch_assoc($res);

  // 2-4. 断开数据库连接
  mysqli_close($link);

  // 3. 根据有没有数据给前端返回结果
  if ($row) {
    $arr = array("message" => "登录成功", "code" => 1);
  } else {
    $arr = array("message" => "登录失败", "code" => 0);
  }

  // 把这关联型数组返回
  print_r(json_encode($arr));

?>
