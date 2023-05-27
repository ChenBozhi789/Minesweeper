const readline = require('readline'); // readline 用户在命令行中获取用户输入 内置 require 导入模块

// 创建 readline.Interface 实例：这个实例会监听用户的输入并处理它。
const rl = readline.createInterface({
  input: process.stdin, // 从 process.stdin（标准输入）获取输入
  output: process.stdout // 将输出发送到 process.stdout（标准输出）
});

// 声明游戏状态全局变量
let board = []; // 建立一个 “大框架”
let boardSize = 3; // 设置游戏版大小
let gameStatus = '';
let emptyCell = 0;
let mineCell = 0;
let cellHasNoMine = 0;

// 创建 boardSize × boardSize 游戏版 每个单元格都有三个属性表示状态
function createBoard() {
  for (let i = 0; i < boardSize; i++) { // Control the number of lines in the game version
    board[i] = []; // 每行创建一个空数组
    for (let j = 0; j < boardSize; j++) {  // Control the number of game board columns
      board[i][j] = { // Indicates the state of each cell
        unveal: false,
        hasFlag: false,
        hasMine: Math.random() > 0.8 ? true : false
        // 如果生成的随机数大于 0.8，那么 hasMine 为 true，否则为 false
      };

      // 如果单元格有地雷则 emptyCell 加 1
      if (board[i][j].hasMine) {
        mineCell += 1;
      } else {
        emptyCell += 1;
      }

    }
  }
  console.log('空白单元格的数量为：' + emptyCell + ' 地雷单元格的数量为：' + mineCell);
}

// 绘制游戏版
function printBoard() {
  for (let i = 0; i < boardSize; i++) {
    let row = ''; // 储存当前行的状态
    for (let j = 0; j < boardSize; j++) { // 遍历当前行的每一个单元格
      if (board[i][j].hasFlag) {
        row += ' F '; 
      } else if (board[i][j].unveal) { 
        // 如果当前单元格没有标记，但已被揭示，则会检查当前单元格是否有地雷
        row += board[i][j].hasMine ? ' M ' : ' E ';
      } else {
        row += ' ? ';
      }
    }
    console.log(row);
  }
}

// 获取用户输入
function getInput() {
  rl.question('请输入你的操作 (reveal x y 或 flag x y): ', (input) => {
    let [action, x, y] = input.split(' ');
    x = parseInt(x);
    y = parseInt(y);

    if (action === 'reveal') {
      if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        board[x][y].unveal = true;
        if (board[x][y].hasMine) {
          gameStatus = 'LOST';
        } else {
          cellHasNoMine++;
        }
      }
    } else if (action === 'flag') {
      if (x >= 0 && x < boardSize && y >= 0 && y < boardSize) {
        board[x][y].hasFlag = true;
      }
    }
  
    printBoard();

    if (gameStatus === 'LOST') {
      console.log('你输了！');
      rl.close();
    } else if (cellHasNoMine === emptyCell) {
      console.log('你赢了！');
      rl.close();
    } else {
      getInput();
    }
  });
}

createBoard();
printBoard();
getInput();
// Main 分支代码