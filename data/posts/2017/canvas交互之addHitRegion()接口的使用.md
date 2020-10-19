---
date: 2017-02-16
---

这段时间研究 canvas，在交互这里遇到了比较大的坑。

据我目前所知，canvas 纳入标准的常用交互接口（可能也就这一个）是 `isPointInPath()` ，它可以判断 js 设置的事件条件是否处于当前绘图路径中，或者说最后一个路径，具体使用如下

```js
//获取鼠标指针坐标
function getMousePos(evt) {
  var rect = document.getElementById('canvas').getBoundingClientRect()
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  }
}

document.getElementById(selector).addEventListener(
  'click',
  function (evt) {
    var mousePos = getMousePos(evt)
    if (context.isPointInPath(mousePos.x, mousePos.y)) {
      //重绘
    }
  },
  false,
)
```

由于 canvas 不保存绘图路径，绘完了就 bia 在页面上，成死的了，因此无法对最后一条路径之前的路径重新拿出来处理。那么传统方法如何处理？--重绘，再针对每一个绘图路径使用 `isPointInPath()` 判断，核心代码使用如下（来自[脚儿网](http://jo2.org/html5-canvas-ispointinpath/)，谢谢作者）

```js
 ...
 function draw () {
 // ...
 }
 function circle () {
 // ...
 }

 draw();
 ctx.fill()
 circle();
 ctx.fill()

 var fns = [draw,circle];
 cvs.onmousemove = function (e) {
   var x = e.offsetX, y = e.offsetY;
   ctx.clearRect(0,0,400,300)
   for(var i = fns.length;i--;) {
     fns[i]();
     if(ctx.isPointInPath(x,y)) {
       ctx.fillStyle = "#f00"
     } else {
       ctx.fillStyle = "#000"
     }
     ctx.fill()
   }
 }
```

canvas 只有一张画布，对之前任何一个路径作刷新，需要重绘所有受到影响的路径，因此，当需要重绘的动作越来越多时，就会对性能造成极大考验。作为 HTML5 的新宠儿，不应就此中道崩殂，我们也不想写如上略显累赘的代码。今天在查阅资料后，发现一个尚在讨论的新接口 `addHitRegion()` [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/addHitRegion)，使用简单而且可以实现良好的交互效果，目前在 chrome 和 firefox 下测试可用（需要在 chrome://flags 中启用【实验性画布功能】或在 firefox 中输入 about:config 使 canvas.hitregions.enabled 值为 true）

具体使用如下

绘图时在需要添加交互事件的路径中添加如下代码

```js
try {
  //id为空会报错
  ctx.addHitRegion({ id: 'excited' })
} catch (e) {
  alert(
    '请在chrome://flags中启用【实验性画布功能】或在firefox中输入about:config使canvas.hitregions.enabled值为true以开启更多功能~~~///(^v^)\\~~~',
  )
}
```

需要注意的是 id 的值不能为空

然后，这样引用

```js
 document.getElementById(selector).addEventListener('click', function (event) {
     if (event.region === 'excited') {
         ...
     }
 }, false);
```

相当于把需要的路径标识出来后面使用，非常方便。

注意：该接口目前尚在实验中，在未来版本的浏览器中其语法和行为可能有所改变。未纳入标准之前，可以玩玩

demo: https://17forever.github.io/canvas-demo/client/
