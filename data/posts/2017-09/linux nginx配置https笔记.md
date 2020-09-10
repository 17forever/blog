---
date: 2017-09-23
---

> 前提：nginx 已启动
> 主机环境：ubuntu 16.04

使用的 ssl 证书为 Lets's Encrypt Authority x3 签发的，是免费使用的，他们的工具现在叫 certbot，使用方法很简单，按[这一套](https://certbot.eff.org/#ubuntuxenial-nginx)流程下来，https 就就可以正常使用了，非常方便。

主要记录一下几个要点

- 多个子域需要各自生成证书，比如 example.com、a.example.com、b.example.com 就需要三个证书，终端用这一条命令搞定：
  `sudo certbot --expand -d example.com,a.example.com,b.example.com`

- 接下来会让你选这个：
  ```
  > Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
  > 1: No redirect - Make no further changes to the webserver configuration.
  > 2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
  > new sites, or if you're confident your site works on HTTPS. You can undo this
  > change by editing your web server's configuration.
  ```

**假如你有很多子域，或设置了泛解析，并且没有分别为每个子域分配证书**

- 如果选择了 1，nginx 不会对非 https 请求作重定向。添加了证书的子域，如果用户输入 http 进入还是按照 http 做请求，未添加证书的子域也还是按照 http 来链接(80 端口)，对用户的体验没有影响。
- 如果选择了 2，会在 nginx 配置文件中加入一个 http => hhtps 的强制重定向操作。那么在访问没有证书的子域时，会出现这个界面（你的连接不安全，需要在**高级**中点继续访问），不过这个子域在连接时仍然使用的 443 端口，这在你将某一没有证书的子域作为 restfulAPI 服务时对一些强制需要 https 的网站很有用，比如小程序，比如苹果。

![TIM截图20170923130244.png](http://upload-images.jianshu.io/upload_images/864719-ed5f64698653ca91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

其实 2 比 1 在 nginx 中就多了这么几行，注释掉和 1 的作用相同

![TIM截图20170923134624.png](http://upload-images.jianshu.io/upload_images/864719-70d45f5dd24cebde.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

在 nginx 这里，最好将每一子域分开写，我写的`*.example.com`，在更新证书时提示没有找到`www.`这个子域，但是感觉这样不合理，应该是可以批量配置的。
