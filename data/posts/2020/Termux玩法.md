---
date: 2020-10-19
update: 2020-10-19
weather: 晴
---

记录一下 Termux 的玩法

### 开启访问本地存储权限

[官方文档](https://wiki.termux.com/wiki/Termux-setup-storage)  
在终端输入 `termux-setup-storage`，手机界面会弹出 Termux 获取存储权限的请求，允许即可。  
此时`cd ~; ls`，会发现在家目录存在一个 storage 目录，进入 storage 目录，shared 为内部存储软链。  
也可使用`cd /sdcard`进入内部存储，与`cd ~/storage/shared`相同。  
![image.png](https://upload-images.jianshu.io/upload_images/864719-0f38b7a8948948c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如果有外置存储，如存储卡，先`cd /storage; ls`，列出的几个目录中如`0853-777D`是外置存储的目录，再`cd 0853-777D`即可  
 ![image.png](https://upload-images.jianshu.io/upload_images/864719-7925eb5319088963.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 更换国内源

Termux 官方源较慢或不稳定，可更换为国内[清华源](https://mirrors.tuna.tsinghua.edu.cn/help/termux/)，更新频率和下载速度较快  
终端输入

```bash
sed -i 's@^\(deb.*stable main\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/termux-packages-24 stable main@' $PREFIX/etc/apt/sources.list
sed -i 's@^\(deb.*games stable\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/game-packages-24 games stable@' $PREFIX/etc/apt/sources.list.d/game.list
sed -i 's@^\(deb.*science stable\)$@#\1\ndeb https://mirrors.tuna.tsinghua.edu.cn/termux/science-packages-24 science stable@' $PREFIX/etc/apt/sources.list.d/science.list
apt update && apt upgrade
```

### PC 端使用 ssh 连接到 Termux

Termux 最新版默认安装了 ssh  
首先确保 Termux 端和 PC 端在同一 Wi-Fi 环境下，或 PC 端连接在 Termux 端开启的热点下

1. 在 PC 端生成 ssh key（如果本地已生成跳到下一步），参考这篇[文档](https://docs.github.com/cn/free-pro-team@latest/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. PC 端 ssh key 生成在 `~/.ssh`目录，想办法将目录中`id_rsa.pub`里的内容拷贝到 Termux 端`~/.ssh/authorized_keys`中（如果 Termux 中没有`.ssh`目录，则使用第一步的方法在 Termux 中生成 ssh 信息）
3. 在 Termux 终端输入`whoami`确认用户名  
   ![image.png](https://upload-images.jianshu.io/upload_images/864719-735e1e34555c474a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
4. 在 Termux 终端输入`ifconfig`确认 ip 地址
5. ![image.png](https://upload-images.jianshu.io/upload_images/864719-446abf93e2e14ca9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
6. 在 Termux 终端输入`sshd`启用 ssh 服务
7. Termux 的默认端口为 8022，在 PC 终端输入以下命令连接  
   `ssh u0_a386@192.168.2.39 -p 8022`
8. 以后重复 6、7 步骤即可

### 传输文件，或在 PC 端浏览移动端图片、视频等文件

实际是在 Termux 端搭建一个 http 服务器

1. 安装 nodejs，在 Termux 端输入`apt install nodejs`
2. 下载开箱即用的 nodejs http 服务器，在 Termux 端输入`npm install -g http-server`
3. 开启 http server，在 Termux 端输入

```
 http-server
```

![image.png](https://upload-images.jianshu.io/upload_images/864719-3c619cbb5c2af4d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4. 对于外置存储，在 Termux 端输入，如

```
http-server /storage/0853-777D/DCIM/Camera/
```

![image.png](https://upload-images.jianshu.io/upload_images/864719-1539f5b9d1686dad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  
其它玩法请看`http-server`[文档](https://github.com/http-party/http-server#readme)
