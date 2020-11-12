window.onload = function () {
  var container = document.querySelector(".container");
  var cellCount = 9;
  var cellSpace = 5;
  var rowCount = Math.sqrt(cellCount);
  var cellWidth = container.offsetHeight / rowCount - cellSpace * 2;

  var positionRecords = [];
  for(var i = 1; i < cellCount; i++){
    positionRecords.push(i);
  }
  
  positionRecords.push("whiteCell");

  function getPosition(index) {
    var left = (index % rowCount) * (cellWidth + cellSpace * 2);
    var top = Math.floor(index / rowCount) * (cellWidth + cellSpace * 2);
    return { left, top };
  }

  function renderRecord(recordArr) {
    for (var i = 0; i < recordArr.length; i++) {
      if (recordArr[i] === "whiteCell") continue;
      var cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.innerText = recordArr[i];
      cellDiv.style.lineHeight = cellDiv.style.width = cellDiv.style.height =
        cellWidth + "px";
      cellDiv.style.fontSize = cellWidth * 0.618 + "px";
      cellDiv.style.margin = cellSpace + "px";
      var position = getPosition(i);
      cellDiv.style.top = position.top + "px";
      cellDiv.style.left = position.left + "px";
      cellDiv.onclick = function () {
        move(this);
      };
      container.appendChild(cellDiv);
    }
  }

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


  function startGame() {
    for (var j = 0; j < Math.round(Math.random() * 100 + 100); j++) {
      for (var i = 0; i < container.children.length; i++) {
        container.children[i].onclick();
      }
    }
  }

  renderRecord(positionRecords);

  var btnStart = document.getElementById("btnStart");
  btnStart.onclick = startGame;
};
