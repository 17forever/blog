---
date: 2017-02-27
---

公司后面的项目会用到 react，这段时间从头学习 react 技术栈，给自己的规划是 react => react router => react redux => react native，目前刚接触到 redux，看的人一脸懵逼，很是憔悴。记录一下这段时间的学习。

目前 react 版本 15.4.2，根据切身体验，首先，通读一遍 react 英文官网教程，读到 form 表单那里即可，需要理解 80%以上内容，并且读懂每一个 demo。看完这些，对 react 思想会有一个基本了解。

然后，学习[w3cplus](https://www.w3cplus.com/react/introducing-react.html)上这个教程，这个教程相当棒，可以看出作者融合了很多自己的想法，而且讲了很多小技巧，也是对官网教程的一个补充。这个教程也相对简单，因此极力推荐将里面的所有 demo 重写一遍。教程上还是用 createClass 创建组件，重写时可以用官网推荐的 es6 写法。我已将所有 demo 用 es6 重写，见[github](https://github.com/17forever/react-demo)

看完以上，这个用 react 写的组件就很容易掌握了 [react 入门实例](http://blog.csdn.net/a153375250/article/details/52667739)

w3cplus 上的教程后面对 react router 有一个大概的介绍，不过网上对 react router 相关的教程比较老，因此，这里推荐通过官方最新教程学习，见[github](https://github.com/reactjs/react-router-tutorial)

学到这，我犹豫写几个 demo 巩固一下之前所学，还是接着学 redux。老板说，应该对整个技术栈有一个大概了解，这样遇到具体项目就知道从何入手，再逐一攻破。抛开 native，我决定至少先了解下 redux。。。。。第一次接触 redux 这种思想，看了半天，这到底是什么玩意？！

不过再难还得学啊，刚刚看到好多相关项目都引进了 webpack，不禁有些感想，曾经学 nodejs 时想了解下 webpack，看半天没明白，感觉特别反人类，就放弃了。而如果用 react 做项目，webpack 是必须要了解的，等到后面用时再看，不如现在就学，哪怕学不会到时也多些理解，多看看多想想总能学会的。无奈团队刚起步，目前就我一个半吊子技术，后期估计前端也只有我负责，只能自己上。看官网教程，看别人项目，终于搞懂了常用配置参数，原来也就那么回事。后面的自动刷新配置耽误了些时间，但也总算搞定了。eslint 也是，又扫清一个拦路虎。

每次遇到那些感觉好难的技术，一时理解不了的，就想先放放。但转念想，如果现在搞定它，那么从此刻起，我将开始受益，而且学一次，受益终生，多么划算的买卖。不仅如此，下一个技术的起点会在这次攻克难关的成果之上，水涨船高，我的视野会越来越宽阔，能力提高得也越来越快。那么，何不再坚持一下？ 等到问题被解决，会发现，并没有自己想象中那么难，这便是一个书越读越薄的过程。

这次的 redux 也是，全新的思想挑战着自己，何不再努力下，离成功更进一步？

// ================= 3 月 21 日更新 ==================

前面废话较多。

到今天从接触 react 整整一个月了，因为公司没项目一直处在学习的过程中。react 整个技术栈大概都了解到了，从学习 redux 开始慢慢有些怀疑人生。不要被它的名字欺骗，其实 redux 跟 react 基本没有关系，它可以算是一种开发思想，用了 redux 你就得按它的套路来组织代码，而且不仅仅能够使用在 react 上，比如 angular 就可以使用 redux，甚至小程序也可以。之前只接触过浅薄的 MVC 模式，这次学 redux 相当痛苦，store、action、reduce 这些词看起来很简单，但是用起来一点也不善良。学 redux 没有捷径，就是不断地看资料、理解，看资料，一遍不行看两遍，两遍不行接着看。我连续看了一周才逐渐理解了它几个部分之间合作的关系，所以，如果看了两三天还是郁闷不要气馁。在这里，不详细介绍 redux 是怎么回事，分享一下我踩过的坑。

- 再次声明，redux 跟 react 没有关系。在 react 项目中引入 redux 可以使用官方的轮子 react-redux ，它提供两个主要功能，connect()和<Provider />，前者需要着重理解，是这个轮子的核心。不用这个这个轮子也能在 react 项目中使用 redux，这时需要手动 dispatch 一个 action，触发视图更新。

- 如上所说，有些资料中没有说明讲得是 redux 还是 react-redux(如果没有提到 react，就要注意最好不要跟 react 产生联系)，你会发现有时候它用 dispatch 一个 action 触发 UI 更新；有时候它没有用 dispatch；有时候它引入了 react-redux 这个库，也用了 connect()这个方法，但最后还是用到了 dispatch。初学时很容易分不清这些概念，再次提醒。

- reducer 不是一个内置接口，只是(prevState, action) => (newState)这种形式的表示。

- 用了 redux，你会发现还需要更多的轮子来完成一个项目，异步就是其中一种。关于 redux 中的 action 异步，以前用 redux-thunk，现在可以试试 redux-saga，一个简易的 saga 例子在[这里](http://www.jianshu.com/p/e199c1881930)

- redux 思想了解清楚后可能会有“你说得我都懂，但写项目时就是不知从何下手”这种尴尬。我思考良久，这是缺少既往的项目开发经验原因（这不废话( ╯□╰ )）。redux 终究是一门架构，考虑的是如何设计出一个结构清晰的 Application，所以，如果你还未开始 reudux,建议不要轻易过早涉及它，去学 react-native 吧，一门更深的坑，但至少深入锻炼了写 react 代码的能力，等将来项目复杂到无法继续用 react 自身优化再来考虑 redux 吧。

分享一些优秀的网站，可按次序来读

1. https://dudu.zhihu.com/story/7997429 浅显易懂的入门介绍

2. http://cn.redux.js.org/ 官方中文文档，多读几遍，注意 redux 和 react-redux 的区别。第 2、3 章的示例可以详细了解下

3. https://segmentfault.com/a/1190000004355491?_ea=661485 这里用的 react-redux

4. https://github.com/joeyguo/blog/issues/3

5. http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html 阮老师的三篇，其实刚开始看时没看懂，了解了 action、reducer 这些再看比较好

6. https://github.com/react-guide/redux-tutorial-cn

7. http://www.cnblogs.com/lewis617/p/5145073.html 讲 connect 的

8. https://yq.aliyun.com/articles/59428 还是 connect

9. http://www.cnblogs.com/hhhyaaon/p/5863408.html connect

10. https://leozdgao.me/reacthe-reduxde-qiao-jie-react-redux/ 在你分得清 redux 和 react-redux 后，会极其想了解他们的区别

11. https://github.com/jasonslyvia/a-cartoon-intro-to-redux-cn

12. http://www.imooc.com/u/4725764/articles 推荐细读，我看了受益匪浅

13. https://www.w3ctech.com/topic/1561

14. https://github.com/kenberkeley/redux-simple-tutorial 这个讲了源码

另分享一个讲 container 和 component 的：http://www.jianshu.com/p/6fa2b21f5df3

没错，我看了这么多资料，仍然无法拿下 redux。这货不是 API 调用那么简单，到一定程度，你还会研究中间件，函数式编程，书都给你备好了：https://www.gitbook.com/book/llh911001/mostly-adequate-guide-chinese/details

再难也得上啊，人生就是一次又一次的破而后立，不断地挑战自己。

最近研究 react-native，之前觉得学了 react，写 native 易如反掌，结果还是太太年轻。用的 react 思想不假，但是这里面没有自定义组件，它只是抽象了几个具有代表性的原生应用组件，比如列表、文字、按钮之类的，是不是觉得很简单？呵呵。地图咋办？据我了解，目前没有一家地图提供商适配 react-native 版的接口，现存的一些还是民间的奇能异士费心研究的，但是 react-native 还没有一个稳定版本，一年前的轮子现在已经用不了了。所以，如果想写一个优秀的 react-native APP，如果需求略复杂，就需要封装现有的原生组件功能，这就要了解 Android 和 IOS 开发。

react-native 还在飞速发展，我们应给予足够的关注和鼓励，这样在不久的将来，才会真正出现一个一次编写，到处运行的全能开发平台。react 目前已经能写 vr，是不是很激动。

相信 react，相信 JavaScript，相信自己。

react-native 踩坑记，不定期更新

tips：

1. 图片的引用参数应始终为字符串，网络图片要指定尺寸
2. 长列表 View 组件封装的视图无法滚动，用 ScrollView
   - ScrollView 一次渲染所有内容，
   - ListView 优先渲染视口内容
3. navigator 必须置于最外层？（initialRoute、renderScene）renderScene 在每次导航调研都会渲染

   - http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B
     目前官方已不再维护 navigator 这个组件，推荐使用 react-navigation，redux 架构，可不止使用在 native 端

4. 容器元素添加 flexDirection 才能让子元素 flex
5. 触摸点击用 TouchableHighlight，属性 onPress
6. 报错时注意项目名是否与文件名一致
7. TextInput 获取组件的输入值需要调用 event.nativeEvent.text
8. margin 包含在 flex 大小内
9. 文本只用 Text 组件
10. 按钮、链接等有交互的动作用 TouchableHighlight 组件
11. 将 Image 至于 View 组件外层作为背景图
12. justifyContent 和 alignItems 均写在父元素作用于子元素
    　　 justifyContent 与主轴平行，后者与主轴垂直
13. 获取数据要放在 componentDidMount 中
14. React 必须 import 进去
15. 项目引用的文件夹改名后必须重启服务
16. source 引用的网络图片需要指定大小才会显示
17. 启动项目时出现诸如 could not delete path…的错误可尝试在 android 目录下执行 gradlew.bat clean（Widnows），然后再 run android
18. Button 组件由 TouchableHighlight 和 Text 包装，所以既能显示文字，又能点击
19. WebView http://www.jianshu.com/p/b37ee000379e#
20. ToastAndroid，底部那个小黑显示条
21. Switch 的 onValueChange 调用时默认传递当前组件的布尔值
22. 在在 android/app/proguard-rules.pro 尾部添加混淆规则
23. 本地浏览器、邮箱等应用打开：Link
24. textinput 去掉安卓下划线：underlineColorAndroid='transparent'
25. 父组件的 props 置为子组件 state 时，父组件 setState 不会刷新子组件 UI
26. 组件通讯：RCTDeviceEventEmitter http://www.jianshu.com/p/5fe3e0f91ce5
27. ios 下可以使用 react-native-maps，默认高德地图。安卓，呵呵
28. expected a component class, got [object Object] error 导出的组件名首字母大写

常用轮子：

1. 新建项目：create-react-native-app
   - http://www.cnblogs.com/shaoting/p/6136447.html
   - https://github.com/MarnoDev/react-native-open-project
   - http://www.jianshu.com/p/53ff78168acc
2. 首屏进入前的 loading 画面： SplashScreen
3. 图标：react-native-vector-icons/Ionicons
4. 底部切换栏：react-native-tab-navigator，不可滑动
5. 顶部标签切换栏（也可渲染到底部，可滑动）：react-native-scrollable-tab-view
   - http://www.jianshu.com/p/b7788c3d106e
6. 本地持久存储
   - https://github.com/sunnylqm/react-native-storage
7. 单图上传：react-native-image-picker
8. 多图上传带裁剪：react-native-image-crop-picker
9. 视频：react-native-video
10. 首屏前图片：react-native-splash-screen
11. 轮播：react-native-swiper
12. 文件操作：react-native-fs
13. 图标：react-native-charts-wrapper
    - http://www.jianshu.com/p/432517c5b531
14. 滑动选项：react-native-swipe-list-view
15. 可自定义的 toast：react-native-easy-toast
16. 很漂亮的底部标签切换：react-native-material-bottom-navigation
17. 列表拖拽排序：react-native-sortable-list

编译的坑

1. 要装 yarn
2. 注意 AndroidManifest.xml 里的格式写法
   　　 meta-data 位于 application 内；
   　　 user-permission 位于 manifest 下，且不可重复
3. 写在 Android 根目录下的 gradle.properties，不用新建
4. MainApplication.java 里 asList 的多余逗号
5. 删除之前的应用
6. can't delete path && can't create => 删除 build 下的目录
7. import 引用的方法要不要带花括号

style 的几种写法
普通写法：

```js
　　 style={{fontSize: 12}}
```

建议写法：

```js
　　 style={styles.fontSize12}
```

集合写法：

```js
　　 style={[styles.fontSize12], [styles.font_color],{fontWeight: 'bold'}}
```

条件写法：

```js
　　 style={index===0 ? styles.index0 : styles.index_other}
　　 style={[ styles.button, this.state.touching && styles.highlight ]}
```

ios 启用 http 例外

```html
<key>NSAppTransportSecurity</key>
<dict>
  <key>NSExceptionDomains</key>
  <dict>
    <key>localhost</key>
    <dict>
      <key>NSTemporaryExceptionAllowsInsecureHTTPSLoads</key>
      <false />
      <key>NSIncludesSubdomains</key>
      <true />
      <key>NSTemporaryExceptionAllowsInsecureHTTPLoads</key>
      <true />
      <key>NSTemporaryExceptionMinimumTLSVersion</key>
      <string>1.0</string>
      <key>NSTemporaryExceptionRequiresForwardSecrecy</key>
      <false />
    </dict>
  </dict>
</dict>
```

其它

gradle 下载失败解决办法
http://www.cnblogs.com/yahue/p/React_Native_Android_gradle.html

native 入门
https://juejin.im/post/5898388b128fe1006cb943e3

很多优秀的资料
https://juejin.im/tag/React%20Native

组件库
https://js.coach/

入门指南
https://github.com/vczero/react-native-lesson

csdn 下载区

集成百度地图
http://www.dswey.com/2016/07/29/react-native-baidu-map/

掘金客户端
https://github.com/wangdicoder/JueJinClient

组件间通信 RCTDeviceEventEmitter
http://www.tuicool.com/articles/uAnYvy

江清清的技术专栏
http://www.lcode.org

国内资源
https://applean.cn/gist/8

支付、日期等
http://jafeney.com/archives/
http://blog.csdn.net/u011413061/article/details/53183370

安卓 dev tool
http://www.androiddevtools.cn/
