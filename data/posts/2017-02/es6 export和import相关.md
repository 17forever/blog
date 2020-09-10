---
date: 2017-02-26
---

在最近写的 react 项目中，把组件分离出单个文件以供使用，这里可以用 export 导出，再通过 import 在别的文件引入。通常的用法如下：

**从 A 文件导出单个函数（也可是对象或原语），在 B 文件引入：**

在 A 文件使用 `export default` 导出需要在 B 文件使用的那个组件（比如 Func 组件）

```js
export default class Func extends React.Component {}
```

那么在 B 文件引入时，可以这样写

```js
import FunName from './A.js'
```

然后在下面的代码中引用 FunName 即可。

注意，这里的 import 的名字(FunName)可以随意取，因为`export default`作为默认导出，每个脚本只能导出一个，而导出的这个值会作为入口文件使用，不管起什么名字指的都是它咯。通常与 A 文件中组件名一样即可。

**从 A 文件导出多于一个（包括一个）函数（也可是对象或原语），在 B 文件引入：**

这时，就不能使用`export default`了。

比如 A 文件有两个组件 Func1, Func2 需要导出

```js
export class Func1 extends React.Component {}

export class Func2 extends React.Component {}
```

除了不写 default 与 1 没有区别，区别在于引入的写法不同。

如果只引入 Func1

```js
import { Func1 } from './A.js'
```

如果需要引入 Func1、Func2 两个组件

```js
import { Func1, Func2 } from './A.js'
```

全部导入

```js
import * as Obj from './A.js'
```

导出的集合形成一个对象，可用自定义名称 Obj 代指这个对象。譬如，addTodo 和 removeTodo 是这个文件中导出的两个函数：

```js
import * as TodoActionCreators from './TodoActionCreators'
console.log(TodoActionCreators)
// {
//   addTodo: Function,
//   removeTodo: Function
// }
```

![](https://images2015.cnblogs.com/blog/1107438/201702/1107438-20170228231526360-2135052137.png)

需要注意的是，引入的组件名必须与导出文件中定义的组件名相同，且必须用花括号包起来。

**此外，还有`module.exports`导出方式。`module.exports`以一个对象的形式导出需要的模块。**

譬如：在 A 文件有一个 store 变量，还有一个 Counter 函数需要导出，此时，可以定义导出形式为：

```js
module.exports = {
  store,
  Counter,
}
```

然后，在 B 文件可以使用{}引入需要的某个模块，比如

```js
import { store } from './A.js'
```

此时在下文中可以直接使用 store 变量，若是用形如

```js
import Obj from './A.js'
```

Obj 代表这个导出的对象集合，需要使用 Obj.store 这样的形式。

参考资料：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export)，[stackoverflow](http://stackoverflow.com/questions/7137397/module-exports-vs-exports-in-node-js)
