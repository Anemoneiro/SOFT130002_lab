# Web Lab11实现文档

段欣然 18307130295



## The function of cookie and session 

### cookie

cookie 是一种服务器留在用户计算机上的小文件，是一种在远程浏览器端储存数据并以此来跟踪和识别用户的机制。每当同一台计算机通过浏览器请求页面时，这台计算机将会发送 cookie。通过 PHP能够创建并取回 cookie 的值。

##### 创建cookie

setcookie() 函数用于设置 cookie。
setcookie() 定义了 Cookie，会和剩下的 HTTP 头一起发送给客户端。 

**注释：**setcookie() 函数必须位于 <html> 标签之前。

语法：`setcookie(name, value, expire, path, domain, secure, httponly);`


| 参数     | 解释                                                         |
| -------- | ------------------------------------------------------------ |
| name     | Cookie 名称。                                                |
| value    | Cookie 值。 这个值储存于用户的电脑里，可通过 $_COOKIE['cookiename'\]获取它的值。 |
| expire   | Cookie 的过期时间。 这是个 Unix 时间戳，即 Unix 纪元以来（格林威治时间 1970 年 1 月 1 日 00:00:00）的秒数。 也就是说，基本可以用 time()函数的结果加上希望过期的秒数。如果设置成零，或者忽略参数， Cookie 会在会话结束时过期（也就是关掉浏览器时）。 |
| path     | Cookie 有效的服务器路径。 设置成 *'/'* 时，Cookie 对整个域名 `domain` 有效。默认值是设置 Cookie 时的当前目录。 |
| domain   | Cookie 的有效域名/子域名。                                   |
| secure   | 设置这个 Cookie 是否仅仅通过安全的 HTTPS 连接传给客户端。    |
| httponly | 设置成TRUE，Cookie 仅可通过 HTTP 协议访问。                  |

   ```php
<?php

setcookie("TestCookie", "CookieName"); /* 关闭浏览器即过期 */
setcookie("TestCookie", "CookieName", time()+3600); /* 1小时过期 */
setcookie("TestCookie", "CookieName", mktime(12,13,14,11,10,2020)); /* 2020/11/10 12:13:14过期 */
setcookie("TestCookie", "CookieName", time()+3600, "/testPath", "example.com", 1); /* cookie在/testPath及其子目录下有效，但在根目录下无效，域名为example.com，仅通过安全的 HTTPS 连接传给客户端 */
?>
   ```

##### 获取 cookie 

$_COOKIE 变量用于取回 cookie 的值。

```php
<?php
echo $_COOKIE["user"]; /* 输出 cookie 值 */
print_r($_COOKIE); /* 查看所有 cookie */
?>
```

##### 删除 cookie 

删除 cookie 时，应当使过期日期变更为过去的时间点。

```php
<?php
setcookie("user", "", time()-3600); /* 设置 cookie 过期时间为过去 1 小时 */
?>
```




#### session 

session 变量用于存储关于用户会话（session）的信息，或者更改用户会话（session）的设置。Session 变量存储单一用户的信息，并且对于应用程序中的所有页面都是可用的。Session 的工作机制是：为每个访客创建一个唯一的 id (UID)，并基于这个 UID 来存储变量。UID 存储在 cookie 中，或者通过 URL 进行传导。



##### 开始 PHP Session

在把用户信息存储到 PHP session 中之前，首先必须启动会话。启动后，会向服务器注册用户的会话，会为用户会话分配一个 UID。

session_start() 用于启动会话。

**注释：**session_start() 函数必须位于 <html> 标签之前。

```php
<?php
session_start();
?>
 
<html>
<body>
</body>
</html>
```



##### 存储 Session 变量

$_SESSION 变量用于存储和取回 session 变量。

```php
<?php
session_start();
$_SESSION['test']=1;
?>
```



##### 销毁 Session

unset() 或 session_destroy() 函数用于删除某些 session 数据。unset() 函数用于释放指定的 session 变量，而 session_destroy() 函数用于彻底销毁 session。

```php
<?php
session_start();
if(isset($_SESSION['views']))
{
    unset($_SESSION['views']);
}
?>
    
<?php
session_destroy();
?>
```



## The advantages & disadvantages of cookie and session. 

#### cookie

| advantage                                                    | disadvantage                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| cookie 存储在客户端，并在发送后由服务器读取，不需要任何服务器资源 | cookie 大小受到限制                                          |
| cookie 可配置到期规则                                        | 用户可以禁用了浏览器或客户端设备接收 cookie 的能力，因此功能可能受限 |
| cookie 由于可配置到期规则，在到期时间较长的情况下数据持久性强 | cookie 可能会被篡改，存在潜在安全风险                        |




#### session

| advantage                                             | disadvantage                                                 |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| session 存储在服务器，相对安全                        | session 会在一定时间内保存在服务器上，访问增多时，会比较占用服务器的性能 |
| php的php.ini配置文件里可设置session的路径和回收空置率 |                                                              |

