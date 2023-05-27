/*
• 该程序必须生成一个3 x 3 格的游戏板。
• 程序必须在棋盘上随机放置地雷。
• 程序必须允许用户选择要揭开的单元格。
• 程序必须指出选定的单元格是否包含地雷。
• 程序必须提供有关所选单元格附近地雷数量的线索。
• 该程序必须允许用户标记他们怀疑包含地雷的单元格。
• 程序必须在所有非地雷单元格都被揭开后结束游戏。
*/

// This is develop branch

const readline = require('readline'); // readline user fetches user input on the command line built-in require imports modules

// Create a readline.Interface instance: this instance will listen for user input and process it.
const rl = readline.createInterface({
  input: process.stdin, // Get input from process.stdin (standard input)
  output: process.stdout // Send output to process.stdout (standard output)
});

// Declare game state global variables
let board = []; // Build a "big frame"
let boardSize = 3; // Set game board size
let gameStatus = '';
let emptyCell = 0;
let mineCell = 0;
let cellHasNoMine = 0;

// Create boardSize × boardSize game board
function createBoard() {
  for (let i = 0; i < boardSize; i++) { // Control the number of lines in the game version
    board[i] = []; // Create an empty array per row
    for (let j = 0; j < boardSize; j++) {  // Control the number of game board columns
      board[i][j] = { // Indicates the state of each cell
        unveal: false,
        hasFlag: false,
        hasMine: Math.random() > 0.8 ? true : false
        // hasMine is true if the generated random number is greater than 0.8, otherwise it is false
      };

      // emptyCell plus 1 if the cell has mines
      if (board[i][j].hasMine) {
        mineCell += 1;
      } else {
        emptyCell += 1;
      }

    }
  }
  console.log('Number of Empty cell: ' + emptyCell + ' Number of Mine cell: ' + mineCell);
}

// Daw game board
function printBoard() {
  for (let i = 0; i < boardSize; i++) {
    let row = ''; // store the state of the current row
    for (let j = 0; j < boardSize; j++) { // Iterate through each cell in the current row
      if (board[i][j].hasFlag) {
        row += ' F '; 
      } else if (board[i][j].unveal) { 
        // If the current cell is not marked, but has been revealed, the current cell is checked for mines
        row += board[i][j].hasMine ? ' M ' : ' E ';
      } else {
        row += ' ? ';
      }
    }
    console.log(row);
  }
}

// get user input
function getInput() {
  rl.question('Please enter (reveal x y OR flag x y): ', (input) => {
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
      console.log('FAIL');
      rl.close();
    } else if (cellHasNoMine === emptyCell) {
      console.log('WIN');
      rl.close();
    } else {
      getInput();
    }
  });
}

createBoard();
printBoard();
getInput();
// develop branch