const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let boardSize = 3;
let gameStatus = '';
let emptyCell = 0;
let mineCell = 0;
let cellHasNoMine = 0;

function createBoard() {
  for (let i = 0; i < boardSize; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize; j++) {
      board[i][j] = {
        unveal: false,
        hasFlag: false,
        hasMine: Math.random() > 0.8 ? true : false
      };
      if (board[i][j].hasMine) {
        mineCell++;
      } else {
        emptyCell++;
      }
    }
  }
  console.log('空白单元格的数量为：' + emptyCell + ' 地雷单元格的数量为：' + mineCell);
}

function printBoard() {
  for (let i = 0; i < boardSize; i++) {
    let row = '';
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j].hasFlag) {
        row += ' F ';
      } else if (board[i][j].unveal) {
        row += board[i][j].hasMine ? ' M ' : ' E ';
      } else {
        row += ' ? ';
      }
    }
    console.log(row);
  }
}

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
// 理解代码
// test
// New branch develop2
// Test