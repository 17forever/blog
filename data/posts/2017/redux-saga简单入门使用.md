---
date: 2017-05-08
---

redux 架构中，如果 action 里有诸如网络请求、磁盘读写等异步操作，会提示使用中间件解决。redux-saga 可以用来做这件事。项目引入 redux-saga 后，可以让 action 做纯粹的 action，一些有副作用的 action 交给 saga 管理。
这里介绍一个比较常用的情况，用 fetch 从服务端请求数据。

在管理 action 处会用到 redux-saga 中的以下接口：

- call，至少接受一个方法名，比如调用 fetch 方法
- put，相当于 redux 中的 dispatch
- takeEvery，接受一个 action 和方法名，全局环境下时刻监听，只要 dispatch 这个 action，便会执行相应的方法

相应代码如下：

import

```js
import { call, put, takeEvery } from 'redux-saga/effects'
```

fetch

```js
function fetchAPI() {
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((resJson) => resJson)
    .catch((err) => err.message)
    .done()
}
```

异步处理(async 以同步形式写异步)

```js
function* fetchUser() {
  try {
    const response = yield call(fetchAPI)
    // 或者
    // const response = yield call( fetch, fetchUrl );

    // 将上一步调用fetch得到的结果作为某action的参数dispatch，对应saga的put
    yield put({ type: 'RECEIVE_DATA_SUCCESS', data: response })
  } catch (error) {
    yield put(fetchFailure())
  }
}
```

注册监听函数

```js
export default function* event() {
  // 一旦'FETCH_DATA_REQUEST'在别处被dispatch，会立即调用fetchUser这个函数，fetchUser再调用fetch，做异步处理后完成相应动作，比如成功就dispatch 'RECEIVE_DATA_SUCCESS'，进而在reducer中更新state
  yield takeEvery('FETCH_DATA_REQUEST', fetchUser)
}
```

以上是一个简单的 redux-saga 处理 fetch 请求的操作，最后，需要在 createStore 这里注册中间件才能使用。

需要引入导出的监听函数，并在 store 生成后 run 这个函数

```js
'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'

// redux saga
import createSagaMiddleware from 'redux-saga'
// 引入导出的监听函数
import rootSaga from '../sagas/index'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(rootSaga)

export default store
```
