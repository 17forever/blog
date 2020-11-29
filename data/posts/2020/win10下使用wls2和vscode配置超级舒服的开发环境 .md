---
date: 2020-11-29
weather: 多云
---

这两天升级了下电脑，重新分了区，作为一个重度磁盘洁癖，把各个盘的任务安排的明明白白。  
在配置开发环境的时候犯了难。以往会在磁盘上新建一个workspace作为开发目录，全局安装node进行开发。这样很方便，终端打开就是一顿唆。但是node版本迭代很快，windows下的nvm也不太好用。作为一个磁盘洁癖，系统环境变量乱飞也是一件很难忍受的事，所以想把开发环境和windows宿主环境隔离开。  
首先想到docker。拉了最新的ubuntu镜像，在容器配置好开发环境，挂载`workspace`。在宿主环境写代码，在容器内部编译打包。确实隔离了环境，但是性能很拉跨，甚至无法进行热更新。而且这个ubuntu镜像太精简，需要配置很多东西，容易引起bug。  
然后是windows10集成的linux子系统，新版本的win10已经使用第二代 wsl2 , 按照 [官方教程](https://docs.microsoft.com/zh-cn/windows/wsl/install-win10) 进行配置，这里强烈推荐安装教程中提到的 Windows Terminal, 是我在windows平台上使用过的最好的终端，进入linux环境后还能安装on-my-zsh，可以说windows下也有了一款能打的终端。  
![windows-terminal.gif](https://upload-images.jianshu.io/upload_images/864719-5a7bf16a65ea2c14.gif?imageMogr2/auto-orient/strip)

如果在安装docker中也启用了wsl2，可以通过`wsl -s ubuntu`设置ubuntu为默认wsl2分发，然后在win10终端输入`wsl`或`bash`可以直接进入ubuntu系统。  
接下来配置vscode，在win10宿主机vscode上安装docker、remote wsl、remote containers三个插件，vscode右下角会显示子系统ubuntu的名称，点击后可打开ubuntu内部的文件。  
![vscode-wsl.png](https://upload-images.jianshu.io/upload_images/864719-53f5a79afd148fda.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

如何在win10资源管理器查看子系统文件？打开资源管理器切换到网络，启用网络发现，在地址栏敲`\\wsl$\`可链接到本地已存在的分发。  
![wls-explorer.png](https://upload-images.jianshu.io/upload_images/864719-44f0fb5f5a80755a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

另外，子系统中也是可以使用宿主机的docker，十分方便。  
性能方面，项目启动的速度和在宿主机比较没有感到差别，十分满意。  
wls2目前的体验已非常完美，和在linux下开发的差别仅在于多输一句`wsl`进入环境。微软近几年在开源动作频频，相信windows下的开发体验会越来越好。