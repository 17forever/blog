---
date: 2017-05-06
---

实现的效果如下

![GIF.gif](http://upload-images.jianshu.io/upload_images/864719-8082619733c970cc.gif?imageMogr2/auto-orient/strip)

主要结合了 react-native 的触摸和动画事件，可通过点击和滑动进行操作。

###组件结构
四个滑块是由父组件 map 而来，因此只分析一个。以 touch 部分在左边为标准，滑块结构如下

```js
<View style={styles.container}>
  <Animated.View
    style={[
      styles.touch,
      {
        transform: [{ translateX: this._animatedValue.x }],
      },
    ]}
  ></Animated.View>
  <View style={styles.card}></View>
</View>
```

实质上只是分成了左右结构，左边的 touch 较为特殊，因为要实现动画效果，由动画组件代替。
想用动画实现什么属性进行变化可通过在 style 中对该属性的值用 Animated.Value()进行初始化。比如想让 touch 的宽度用动画进行变化， 便可初始化宽度为`width: new Animated.Value(0)`.

### 开始

起初，没有引入动画，将 touch 定位设置为 relative，在触摸事件中监听其 onLayout，通过 setState 实时刷新位置，代码实现见[这一版](https://github.com/17forever/ELTD/commit/bc79e3ca5454dcfe3325020b1ae7eb3f51bd9a4a#diff-b66cfaf949cce4c0be5b5af71cd1de1d)。
为了性能，为了交互，也为了折腾，引入 Animated 与 PanResponder，让这两个好基友一起做点什么。

> 关于 Animated 和 PanResponder 的详细介绍可查看本文底部讲得非常好的参考链接，下面说实现。

#### constructor

```js
  constructor(props) {
    super(props);
    this.state = {
      isTouch: false, // 是否处于点击状态
      blockInLeft: true, // touch是否在左侧
    }

    this._containerWidth = null; //滑块组件宽度，可在render内通过onLayout得到
    this._touchBlockWidth = null; //touch宽度
    this._touchTimeStamp = null; // 为不允许双击事件发生设置的一个当前点击时间点

    this._startAnimation = this._startAnimation.bind(this)

    this._animatedDivisionValue = new Animated.Value(0); //初始化动画值
  }
```

#### 触摸事件注册

```js
  componentWillMount() {
    this._animatedValue = new Animated.ValueXY()
    this._value = {x: 0}
    // 这里为了监听后面动画事件中setValue的值
    this._animatedValue.addListener((value) => this._value = value);
    this._panResponder = PanResponder.create({
    // 写法基本是固定的
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder.bind(this),
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder.bind(this),
      onPanResponderGrant: this._handlePanResponderGrant.bind(this),
      onPanResponderMove: this._handlePanResponderMove.bind(this),
      onPanResponderRelease: this._handlePanResponderEnd.bind(this),
      onPanResponderTerminate: this._handlePanResponderEnd.bind(this),
      });
  }
```

#### 与动画的结合

```js
 _handleStartShouldSetPanResponder(e, gestureState){
    // 避免双击，与上次点击在500ms以内时不处理点击事件
    const tick = new Date().getTime();
    if (tick - this._touchTimeStamp < 500) {
      return false;
    }
    this._touchTimeStamp = tick;
    return true;
  }
  _handleMoveShouldSetPanResponder(e, gestureState){
    // 是否响应移动事件
    return true;
  }
  _handlePanResponderGrant(e, gestureState){
    // touch告诉事件处理器，有人把手放我身上了
    this.setState({
      isTouch: true
    })
    // 归位
    this._animatedValue.setOffset({x: this._value.x});
    this._animatedValue.setValue({x: 0});
  }

  _handlePanResponderMove(e, gestureState) {
    // 这个方法在手指移动过程中连续调用

    // 计算滑块组件减去touch部分剩余的宽度，可写在外部
    let canTouchLength = this._containerWidth - this._touchBlockWidth

    // 在边界处不可向己边滑动。祥看下面endValue介绍
    if ( (this.state.blockInLeft && gestureState.dx > 0 && gestureState.dx < canTouchLength) || (!this.state.blockInLeft && gestureState.dx < 0 && gestureState.dx > -canTouchLength) ) {

      // 动画跟随触摸移动的关键，触摸动画实现的核心所在。只有在符合上述条件下touch才进行移动。
      this._animatedValue.setValue({x: gestureState.dx})
    }

    // 如果不需要边界处理，也可用event代替setValue
    // Animated.event([
    //     null, {dx: this._animatedValue.x}
    // ])
  }

  _handlePanResponderEnd(e, gestureState){
  // 这个方法在手指离开屏幕时调用

    // 同上，代码冗余，建议写在外部
    let canTouchLength = this._containerWidth - this._touchBlockWidth

    // 偏移。moveDistance计算touch的偏移值，判断其不等于0是为了处理点击操作
    // gestureState.moveX有移动才会有值，点击的话值为0
    let moveDistance = gestureState.moveX !== 0 ? gestureState.moveX - gestureState.x0 : 0;


    // 确定移动方向。moveDistance大于0时代表touch向右移动，不管在左边还是右边
    const toRight = moveDistance>0 ? true : false;

    // 取移动距离
    moveDistance = Math.abs(moveDistance)

    // 设定个中间值决定滑块最终移向哪边。中间值为滑块宽度减去touch宽度的一半
    const middleValue = canTouchLength / 2

    // endValue为以左边为原点，最终移动位置相对于左边的距离。
    // 这里为了实现触摸时如果没有将touch移动到最大位置释放操作，touch最终选择移动到左边还是右边
    // 所以，向右移动touch时，中点以前为0，过了中点endValue为最大值
    // 再向左移动时，中点以前为0（即不移动），过了中点为最大值的反向
    // 这里还有个问题，touch的偏移实现上，是有累加性的。
    // 即比如先向右移动touch到最大值，0 + maxValue，实现这个操作后，滑块所处的位置maxValue会重设为0
    // 如果想移回来到左边，就需要0 - maxValue，这便是偏移的累加性
    let endValue = 0

    // 防止touch会被鼠标拽出边界，给第二个条件加上 this.state.blockInLeft 的判断
    if ( (this.state.blockInLeft && moveDistance === 0) || (toRight && this.state.blockInLeft && (moveDistance > middleValue)) ) {
      // touch向右移动时过了中点，或者touch在左边时，被单击
      endValue = canTouchLength
      this.setState({
        blockInLeft: false
      })
    } else if ( (!this.state.blockInLeft && moveDistance === 0) || (!toRight && !this.state.blockInLeft && (moveDistance > middleValue)) ) {
      // touch向左移动时过了中点，或者touch在右边时，被单击
      endValue = -canTouchLength
      this.setState({
        blockInLeft: true
      })
    }

    // touch到边界时会回弹的动画开始
    this._startAnimation(endValue);

    this.setState({
      // 这人把手从我身上拿开了
      isTouch:  false
    })

  }

  _startAnimation(endValue) {
    Animated.spring(this._animatedValue, {
      toValue: endValue,
      tension: 80
    }).start(
      () => {
        // 这里本来想在动画结束后做一些事情，但是发现回调有些问题
        // 可能是回弹的动画不一定会在touch移动的动画结束后触发
      }
    );
  }
```

这是整个触摸与动画结合的实践。对于 touch 移动后另一边的信息也发生移动，可通过监听 touch 的 blockInLeft，用 margin 对另一边信息进行定位，这是我试过最简单而且没有副作用的方法。
还想实现的一个功能是，随着 touch 从一边移动到另一边，底部文字的透明度从 1 -> 0 -> 1 这样切换。
代码可以精简，性能还可以优化，先提供一个实现该功能的方法。欢迎拍砖指正，交流学习。

### 参考文章

- [React-Native 触摸与动画](http://xgfe.github.io/2016/08/21/lulutia/react-native-touch-animation/)
- [「指尖上的魔法」- 谈谈 React Native 中的手势](https://juejin.im/entry/55fa202960b28497519db23f)
- [React Native Animation Book](http://browniefed.com/react-native-animation-book/)
  谢谢奉献
