// 定义全局变量
let Board = []; // 定义一个空的二维数组 全局变量
let Boardsize = 3; // 游戏版的大小 3 × 3 全局变量
let GameStatus = ''; // 定义 GameStatus 为空字符串
let EmptyCell = 0; // 空白格数量
let MineCell = 0; // 地雷格数量
let CellHasNoMine = 0; // 空白且无雷的单元格数量
let canvas = document.getElementById('Minesweeper'); 
let ctx = canvas.getContext('2d');
let NeighborMineCount = 0;

// CreateBoard() 用二维数组创建一个3x3的游戏版
function CreateBoard() {
  // 构造函数 表示每个单元格的状态 是否翻开、是否有雷、是否被标记、周围雷数
  function Cellstatus() { 
    this.Unveal = false;
    this.hasFlag = false;
    this.hasMine = false;
    this.NeighborMineCount = 0;
  }

  for (var i = 0; i < Boardsize; i++) {
    Board[i] = []; // 每行定义一个新的空数组
    for (var j = 0; j < Boardsize; j++) { // 因为需要涉及每一个单元格 所以需要在内部 for 循环编写
      Board[i][j] = new Cellstatus(); // 为每个单元格（每行中的每一列）创建一个对象来表示单元格状态   

      // 随机生成地雷 
      if (Math.random() > 0.8) { 
        Board[i][j].hasMine = true;
        MineCell =  MineCell + 1;
 
      } else {
        Board[i][j].hasMine = false;
        EmptyCell =  EmptyCell + 1;        
      }
    }
  }
  console.log('空白单元格的数量为：' + EmptyCell + ' 地雷单元格的数量为：' + MineCell);
}

function init() {
  var canvas = document.getElementById('Minesweeper');

  canvas.onclick = OnCanvasClick; // 左键点击调用 OnCanvasClick 函数
  canvas.oncontextmenu = OnCanvasRightClick; // 右键点击调用 OnCanvasRightClick 函数

  CreateBoard(); // 调用 CreateBoard() 函数
  DrawBoard(); // 调用 DrawBoard() 函数
}

init(); // 调用 init() 函数
// -----------------------------------------------------------------
// 赋给 HTML 文档中 Canvas 元素作为事件处理程序 所以是响应回调函数
function OnCanvasClick(mouseEvent) { // 左键点击
  // Defined row and col
  var row = Math.floor(mouseEvent.offsetY / 100);
  var col = Math.floor(mouseEvent.offsetX / 100);
  Board[row][col].Unveal = true; // 当鼠标点击 Canvas 后将单元格 Unveal 状态更新为 true
  
  // TODO: 第一次翻开没有地雷

  // Game Over and STOP
  if (GameStatus == 'WIN' || GameStatus == 'LOST') {
    return;
  }
  
  // GameStatus
  if (Board[row][col].hasMine == true &&
      Board[row][col].Unveal == true) {
      GameStatus = 'LOST';
  } else if (Board[row][col].Unveal == true &&
      Board[row][col].hasMine == false) {
      CellHasNoMine += 1;
      // 显示周围地雷数
  }  

  DrawBoard(); // 点击完刷新界面

  // GameStatus == 'WIN'
  if (CellHasNoMine == EmptyCell) {
      GameStatus = 'WIN';
      ctx.fillStyle = 'red';
      ctx.font = '64px bold';
      ctx.fillText('YOU WIN!', 0, 180, 300);
      return;
  }

 
  console.log('翻开的单元格无雷的数量：' + CellHasNoMine);
  // TODO: 显示周围雷数

}

function OnCanvasRightClick(mouseEvent) { // 右键点击
  mouseEvent.preventDefault(); // Prevent the browser's default right-click behavior
  var row = Math.floor(mouseEvent.offsetY / 100);
  var col = Math.floor(mouseEvent.offsetX / 100);

  if (Board[row][col].Unveal == false &&
      Board[row][col].hasFlag == false) {
      Board[row][col].hasFlag = true;
      DrawBoard();
  }


  /* 取消标记方格
  if (!Board[row][col].Unveal) {
    if (Board[row][col].hasFlag) {
      Board[row][col].hasFlag = false; // 如果已经标记，那么取消标记
    }
  }
  */
  DrawBoard(); // 更新画布
}

function DrawBoard() { 
  for (var row = 0; row < Board.length; row += 1) { // Board.length 输出 3 [0] [1] [2] 行
    for (var col = 0; col < Board[row].length; col += 1) { // Board[row].length 输出 3 列
      var y = row * 100; // 行
      var x = col * 100; // 列
      ctx.strokeStyle = "black";
      ctx.strokeRect(x, y, 100, 100);    
      ctx.fillStyle = 'grey';
      ctx.fillRect(x, y, 100, 100);

      // open blank cell
      if (Board[row][col].Unveal == true &&
          Board[row][col].hasMine == false) {
          // background fill color becomes white
          ctx.fillStyle = 'white';
          ctx.fillRect(x, y, 100, 100);
          // "EMPTY" characters appear
          ctx.fillStyle = 'black'
          ctx.font = '28px bold';
          ctx.fillText('EMPTY', x +5, y + 60, 100);
      }

      //  翻开地雷单元格： 
      if (Board[row][col].Unveal == true &&
          Board[row][col].hasMine == true) {
          // 背景填充色变为黄色
          ctx.fillStyle = 'yellow';
          ctx.fillRect(x, y, 100, 100);
          // 出现“MINE"符
          ctx.fillStyle = 'black'
          ctx.font = '28px bold';
          ctx.fillText('MINE', x +10, y + 60, 100);
      }

      // 标记未翻开的方格
      if (Board[row][col].hasFlag == true) {
          // 背景填充色变为橙色
          ctx.fillStyle = 'orange';
          ctx.fillRect(x, y, 100, 100);
          // 出现 “FLAG” 字符
          ctx.fillStyle = 'black'
          ctx.font = '28px bold';
          ctx.fillText('FLAG', x +5, y + 60, 100);
      }
      
      if (GameStatus == 'LOST') {
        ctx.fillStyle = 'red';
        ctx.font = '64px bold';
        ctx.fillText('YOU LOST', 0, 180, 300);
      }

    }
  }
}