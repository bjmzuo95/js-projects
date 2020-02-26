let grid;
let col;
let row;
let w = 40;

function setup() {
  createCanvas(401, 401);

  col = floor(width / w);
  row = floor(height / w);
  grid = make2DArray(col, row);

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }

  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j].countBees();
    }
  }
}

function draw() {
  background(0);
  fill(255);
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j].show();
    }
  }
}

function make2DArray(col, row) {
  let arr = new Array(col);
  for (let i = 0; i < col; i++) {
    arr[i] = new Array(row);
  }
  return arr;
}

function mousePressed() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        if (mouseButton === LEFT) {
          grid[i][j].reveal();
          if (grid[i][j].bee) {
            gameOver();
          }
        } else if (mouseButton === RIGHT && !grid[i][j].revealed) {
          if (!grid[i][j].marked) {
            grid[i][j].marked = true;
          } else {
            grid[i][j].marked = false;
          }
        }
      }
    }
  }
}

function gameOver() {
  for (let i = 0; i < col; i++) {
    for (let j = 0; j < row; j++) {
      grid[i][j].revealed = true;
    }
  }
}
