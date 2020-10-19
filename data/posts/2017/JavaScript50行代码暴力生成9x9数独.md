---
date: 2017-10-12
---

> 最初是用 react 写的，但核心代码完全是原生 js，做些小的改动还能移植到小程序，核心生成数独代码只有 50 行，实现效果如下

![case.gif](http://upload-images.jianshu.io/upload_images/864719-ff30692945608f7d.gif?imageMogr2/auto-orient/strip){referrerPolicy=no-referrer}

## 基本思路

暴力生成，比如从数字 1 开始，第一行，随机一个位置放 1，第二行起，除了确定当前纵列没有 1，每一个小九宫格也不应有 1。数字 1 在每一行放置完后从第一行起放置 2。如图示：

![image.png](http://upload-images.jianshu.io/upload_images/864719-4c33f95d4881e46e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/270)

## 代码实现

1. 入口函数，在 react 的`componentWillMount`处调用

```js
  handleGenerateSudoku(){
    if(this.state.btnDisabled){
      return
    }
    // 重点是这一行和下面的while循环
    this.generateSudokuSuccess = false
    this.setState({
      btnDisabled: true,
      array: null
    })
    let result = null

    // 当数独未生成成功时，持续调用
    while(!this.generateSudokuSuccess){
      result = this.generateSudoku()
      // console.log(result)
    }
    this.setState({
      btnDisabled: false,
      array: result
    })
  }
```

2. 下面开始为每一个数字寻找合适位置
   1. 当前行： 正在处理数独哪一行
   2. 当前数字： 正在为 1-9 哪个数字分配位置索引

```js
   generateSudoku(){

    /**
     * 首先创建一个9x9二位数组array，如[[undefined, undefined, ...], [..], [..],...[..]]
     * array代表整个数独容器
     * array的第一个索引array[x]代表数独的每一行，array[x][y]表示每一个单元格，填充单个数字。
     */
    let array = new Array(9)

    // new Array创建的数组默认填充undefined，使用map等函数式方法无法遍历
    for(let i=0; i<9; i++){
      array[i] = new Array(9)
    }

    /**
     * 时间戳的作用是避免某一数字在各行索引生成失败而长时间循环下去。
     * 在实际应用中，如果前面的数字随机的不合理，会导致数独无解
     * 设置一个时间戳，当一定时间后，这里是1000ms后，如果数独仍未生成成功，返回这个函数
     * 在while内部的else if 代码块中如果超时，返回到上面第1步从第一行重新生成数独
     * 这种处理方法不好，有待优化
     */
    let time = new Date().getTime()

    // 1-9共9个数字，所以循环9次，为每个数字寻找合适的位置索引
    for(let j=0; j<9; j++){
      // 存放当前数字合法位置索引的地方，比如，上图中数字1（当前数字）的合法索引为[2, 5, 7, 6, 1, 4, 3, 8, 0]
      let idxInList
      // 当前数字的索引是否分配完毕，默认没有
      let notComplete = true
      while (notComplete) {
        idxInList = []
        // 循环数独每一行，即在每一行为当前数字寻找索引
        // 将数独当前行的数字填充情况、当前第几行和当前数字的合法索引位置传进去处理
        // 返回一个索引位置，表示当前数字在当前行应填充的位置
        for(let k=0; k<9; k++){
          let avalibIdx = this.avalibleIdx(array[k], k, idxInList)
          // 如果返回的位置有效，更新当前数字的索引位置
          if(avalibIdx !== undefined){
            idxInList.push(avalibIdx)
          }
        }

        // for循环完成后

        // 如果当前数字在每一行的9个索引位置全部查找完毕，完成，退出while循环
        if (idxInList.length === 9){
          notComplete = false
        } else if (new Date().getTime() - time > 1000){
          // 超时的话返回这个函数，从1重新开始生成数独
          return
        }
        // 否则继续while循环，将当前数字从第一行重新安排位置
      }

      // 要return，不map
      // 如果while循环出来，说明当前数字的位置索引完成，更新array
      for(let n=0; n<idxInList.length; n++){
        array[n][idxInList[n]] = j+1
        if(j===8 && n===8){
          // 如果是第8个数字，即9，说明所有数字的位置更新完成。整个数独生成完毕，返回array结果
          this.generateSudokuSuccess = true
          return array
        }
      }
    }
  }
```

3. 下面是为当前数字分配一个索引位置的操作，这里处理的是当前数字在当前行（具体的某一行）的可能性

```js
  // 每行分为3块，即三个九宫格，同一数字在三行内不处于同一块
  /**
   *
   * @param {Array} rowList - 数独当前行的数字填充情况
   * @param {Number} idxOfRowList - 数独第几行
   * @param {Array} idxInList - 当前数字在每行所处位置，即位置索引
   */
  avalibleIdx(rowList, idxOfRowList, idxInList){
    // 存储当前数字在当前行所有可能的存储位置
    // 比如数独第一行时，应有9个位置
    // 第二行时，除去一个九宫格，有6个可能的位置
    // 第三行只有3个合法位置
    // 但是第四行，去除九宫格限制，减去不能同列的位置，有6个合法位置
    // ...
    let avalibleList = []
    // 循环数独当前行的每一个单元格，只有是undefined（没有数字填充）并且在已有的位置索引记录中不同于该位置（即排除相同列）继续
    for(let m=0; m<9; m++){
      if(rowList[m] === undefined && idxInList.indexOf(m)===-1){
        // 在1，4，7行，即array[0], array[3], array[6] 这三行不受九宫格限制
        // 只要是undefined就把该位置的索引记录下来
        if(idxOfRowList % 3 === 0){
          avalibleList.push(m)
        } else {

          // 在2，3，5，6，8，9行，受九宫格限制，需排除掉
          // 找出当前数字在上一行的索引位置，如果与当前行正在循环的索引位置处于同一个九宫格区间，跳过
          // 2，5，8行比对的是九宫格第一行；3，6，9比对第二行
          // 如果不在同一个九宫格区间，且不是第3， 6， 9行，记录该位置
          let blockLastIndex = idxInList[idxInList.length - 1]
          if(( blockLastIndex < 3 && m < 3) || ( (blockLastIndex>=3 && blockLastIndex<6) && (m>=3 && m<6) ) || ( blockLastIndex >= 6 && m >= 6) ) {
            continue
          } else {
            // 在3，6，9行
            // 找出当前数字在上上一行（即九宫格第一行）的索引位置，如果与当前行正在循环的索引位置处于同一个九宫格区间，跳过
            // 否则记录该位置
            if(idxOfRowList % 3 === 2){
              let blockAheadIdx = idxInList[idxInList.length - 2]
              if(( blockAheadIdx < 3 && m < 3) || ( (blockAheadIdx>=3 && blockAheadIdx<6) && (m>=3 && m<6) ) || ( blockAheadIdx >= 6 && m >= 6) ) {
                continue
              }
            }
            avalibleList.push(m)
          }
        }
      }
    }

    // 去重记录的合法位置索引，并随机一个返回，作为当前数字在当前行的合法位置记录在idxInList数组
    let resultList = Array.from(new Set(avalibleList))
    return resultList[Math.floor(Math.random() * resultList.length)]

  }
```

> 完整代码在[这里](https://github.com/17forever/sudoLite/blob/react/src/main/main.js)

## 移植到小程序

代码经过补充，具备一个基本数独小游戏的功能，已移植到小程序，详见[sudoLite](https://github.com/17forever/sudoLite)

![sudoLite](http://upload-images.jianshu.io/upload_images/864719-b9b3fca5b25e2460.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/270)

> sudoLite 是一款轻巧、趣萌、界面精美，具备统计、排行（即将推出），开源、免费、无广告的数独小程序

### 截图

#### 主页

![image.png](http://upload-images.jianshu.io/upload_images/864719-07cc3bdcbc8333ce.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/270)

#### 统计

![image.png](http://upload-images.jianshu.io/upload_images/864719-b123b6411a1fd3e8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/270)

### ENJOY

![image.png](http://upload-images.jianshu.io/upload_images/864719-24e737f713e92516.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/270)
