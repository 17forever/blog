---
date: 2017-09-23
---

以前在玩虚拟主机那会，主机管理用的 CPanel。配置子域，建一个 wordpress 站点都是在 GUI 的管理界面完成，当时很不清楚如果有多个域名、多个子域，主机空间是怎样分配的。

后来玩上了云服务器，Amazon EC2 ，开始写后台，知道了只要把应用在 80 端口启动，ip 设为 0.0.0.0，就能让全世界的朋友看到你的作品。但还是不明白，怎样在一个主机服务器中配置多个站点，我知道是可以这样玩的。

这段时间了解了 nginx，猛然发现它是解决我疑惑的技术。了解后发现，nginx 像铁路调度系统，站在 80 路口，每一个请求会携带请求的目的，就是 URL，像是火车的编号，那个编号走那条路是由调度系统决定的，具体表现在 nginx 的配置文件里。

```
http {
  server {
    listen          80;
    server_name     domain1.com;
    access_log      logs/domain1.access.log main;
    location / {
      index index.html;
      root  /var/www/domain1.com/htdocs;
    }
  }
  server {
    listen          80;
    server_name     www.domain2.com;
    access_log      logs/domain2.access.log main;
    location / {
      index index.html;
      root  /var/www/domain2.com/htdocs;
    }
  }
}
```

在这个配置中，请求 url 是`domain1.com`，nginx 会发出位于`/var/www/domain1.com/htdocs`这个目录的文件，如果是`www.domain2.com`，发出`/var/www/domain2.com/htdocs`的文件，子域、其它域都是这样分拣，如果需要发出一个服务而不是静态文件，配置到服务的具体位置即可，这样，不同的服务就可以指定自己的端口号了。

以上为我的粗浅理解
