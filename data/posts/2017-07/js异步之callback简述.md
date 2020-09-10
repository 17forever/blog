---
date: 2017-07-07
---

js 及 nodejs 由于其单线程特性，对于应用中比较耗时的网络请求、磁盘操作均已异步形式完成。因此，经常看到如下形式

```js
getLocation(res){
   if(res.ok){
     login(res){
        if(res.ok){
          setState()
      }
    }
  }
}
```

getLocation 成功后才能执行 login 操作，login 成功后才能 setState 更新数据
如果中间还要添加会阻塞当前应用进程的操作，且其数据依赖于上一部操作成功返回的结构，就需要写在上一步的成功回调下，这样嵌套层级越来越多，就会陷入所谓的“回调地狱”。对于此类问题的解决，有 es6 的 promise 和 es7 的 async/await，这里，我们不研究深层次的回调问题，只讨论当遇到这种情况时，如何将其封装成一个模块达到重复利用。

以常用的 fetch 为例

```js
export default function _update(url, data, callback) {
  let init = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify(data),
  }

  fetch(url, init)
    .then((res) => res.json())
    .then((res) => {
      // fetch请求得到相应，根据回传的res执行下一步操作
      callback(res)
    })
}
```

\_update 为封装的一个通用 fetch 模块，接受请求 url，请求时发送给服务端的数据，以及请求成功时需要执行的回调函数三个参数。callback 的传递保证 fetch 在服务端有数据返回后调用，因此，可以像如下形式使用这个模块。

```js
import update from 'update.js'

update(
  'https://xxx',
  {
    name: 'xm',
    age: 12,
  },
  (res) => {
    console.log(res)
  },
)
```

传递给 update 三个参数，对应于模块中的形参。
调用函数中第三个函数参数

```js
;(res) => {
  console.log(res)
}
```

对应于模块中的 callback(res)，相当于

```js
function callback(res) {
  console.log(res)
}
```

如果在 update 前先要获取到当前位置

```js
function getLocation(callback){
  ......
  if(res){
    callback(url)
  }
}
```

如果获取位置成功，将位置信息 res 传递给 update 函数，update 在 fetch 请求得到相应后刷新数据，那么将 getLocation 改造成如下即可

```js
function getLocation(callback){
  ......
  if(res){
    callback('https://xxx', {
      location: res
    }, res => {
      cosole.log(res)
    })
  }
}
```

两个 res，一个是获取到位置回传的 res，另一个是 fetch 请求相应回传的 res
调用只需要一行代码

```js
getLocation(update)
```

可以将 update 的三个参数传递给 getLocation，达到更大的复用性。但这样一来，代码脉络不够清晰，显得有些累赘了。
建议只有一层回调时使用这种封装方法，如果对方法有更好的设计，多层回调时也不妨一试。
