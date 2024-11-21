# 小游戏-数字华容道

<img src="./sources/game.png" width=300 />

数字华容道这款游戏曾经出现在江苏卫视真人秀节目“最强大脑”。

游戏旨在用尽量少的步数，尽量短的时间，将棋盘上的数字方块，按照从左到右、从上到下的顺序重新排列整齐。

## 游戏中的技术点

* HTML + CSS + 少量CSS3
* JavaScript
* DOM API

## 实现步骤

- [ ] 页面布局
- [ ] 动态创建数字方块实现数字方块定位
- [ ] 实现数字方块的点击移动功能
- [ ] 完成Start按钮功能



## 详细步骤

### I. 页面布局

页面结构主要结构由两部分组成，游戏盒子和 Start 按钮。

#### 核心代码

```html
<body>
  <div class="main">
    <div class="container"></div>
    <a href="#" id="btnStart">Start</a>
  </div>
</body>
```

### II. 动态创建数字方块

#### 为什么要动态创建数字方块，不能直接写在页面里面吗？

1. 盒子直接以固定编码的方式放在页面之中，会导致后续盒子移动操作难度增加
2. 以动态方式创建数字方块，可以实现游戏难度变化

#### 如何动态创建数字方块？

1. `Document.createElement` 方法可以实现动态创建元素
2. `元素.style` 属性可以用来为元素设置样式，方便给数字方块做定位
3. `父元素.appendChild` 方法可以用来将创建好的元素添加到父盒子中

#### 核心代码

```js
var cellDiv = document.createElement("div");
cellDiv.classList.add("cell");
cellDiv.style.top = "当前盒子对应的top值";
cellDiv.style.left = "当前盒子对应的left值";
父盒子.appendChild(cellDiv);
```

#### 如何确定每个盒子自己的 `top` 和 `left` 值？

只要知道当前盒子的 `index` 值，便可通过如下公式计算当前盒子的 `top` 和 `left` 值。

```js
// 1. 首先通过 index 值确定当前盒子所在的行和列
var row = Math.floor(index / 3);
var col = index % 3;
// 2. 再通过行 row 和列 col 来算出当前盒子的top和left值
var top = row * cellWidth;
var left = col * cellWidth;
```

### III. 实现数字方块的点击移动功能

#### 如何实现盒子的移动？

在点击数字方块的时候，首先找到空白盒子的位置，然后若当前数字方块可移动，则修改当前数字方块的 `top` 和 `left` 值，将其移动到空白盒子的位置即实现了盒子移动。

**核心代码**

```js
function move(cell) {
  var index = positionRecords.indexOf(+cell.innerText);
  if (canCellMove(index)) {
    var whiteCellIndex = positionRecords.indexOf("whiteCell");
    var desPositon = getPosition(whiteCellIndex);
    cell.style.top = desPositon.top + "px";
    cell.style.left = desPositon.left + "px";
    positionRecords[index] = "whiteCell";
    positionRecords[whiteCellIndex] = +cell.innerText;
  }
}
```

#### 如何判断当前盒子是否可以移动？

如果空盒子和当前盒子在相邻的一列或者一行，当前盒子就可移动。

#### 核心代码

```js
function canCellMove(index) {
  var whiteCellIndex = positionRecords.indexOf("whiteCell");
  var x = index % rowCount;
  var y = Math.floor(index / rowCount);
  var whiteX = whiteCellIndex % rowCount;
  var whiteY = Math.floor(whiteCellIndex / rowCount);
  return (
    (x == whiteX && (y + 1 == whiteY || y - 1 == whiteY)) ||
    (y == whiteY && (x + 1 == whiteX || x - 1 == whiteX))
  );
}
```



### IV. 完成Start按钮功能

如果将数组随机打乱，然后按照数组顺序渲染数字方块，可能会出现导致游戏无法完成的 Bug，故使用模拟点击的方式，点击100到200次。

```js
function startGame() {
  for (var j = 0; j < Math.round(Math.random() * 100 + 100); j++) {
    for (var i = 0; i < container.children.length; i++) {
      container.children[i].onclick();
    }
  }
}
```

## CSS3 相关知识点

### border-radius

`border-radius` 是 CSS3 中的属性，可以用来设置圆角样式。[MDN 用法详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)

```css
div{
  border-radius: 10px;
  /* 10px 指的是圆角的半径 */
}
```

### box-shadow

`box-shadow` 是用来设置盒子的阴影样式的。[MDN 用法详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow)

```css
div{
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 10px 10px 5px 5px rgba(0, 0, 0, 0.25);
}
```

### text-shadow

`text-shadow` 是用来设置文字阴影的。[MDN 用法详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow)

```css
div{
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色 */
  text-shadow: 1px 1px 2px black;
}
```

### transition

`transition` 属性可以用来实现过渡效果。也可以理解为修改当前元素样式时，触发动画效果。[MDN 用法详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)

```css
div{
  /* 属性名 | 过渡时长 */
  transition: all 1s;
}
```

## H5 相关知识点

### document.querySelector

`document.querySelector` 方法可以用来获取页面元素，参数为选择器，返回值为 DOM 对象。[MDN 用法详解](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelector)

```js
var div = document.querySelector("div");
var div = document.querySelector("#box");
var div = document.querySelector(".box");
```

