const pixelSize = 5;
const colorSet = ['#F1DEC9', '#C8B6A6', '#A4907C', '#8D7B68'];
let grid;
let rows, cols;
let color = 1;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows).fill(0);
  }

  return arr;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / pixelSize);
  rows = floor(height / pixelSize);
  grid = make2DArray(cols, rows);
}

function touchMoved() {
  const col = floor(mouseX / pixelSize);
  const row = floor(mouseY / pixelSize);
  if (col >= 0 && col < cols && grid[col][row] === 0) {
    grid[col][row] = color;

    if (row - 1 >= 0 && grid[col][row - 1] === 0) {
      grid[col][row - 1] = color;
    }
    if (col - 1 >= 0 && grid[col - 1][row + 1] === 0) {
      grid[col - 1][row + 1] = color;
    }
    if (col + 1 < cols && grid[col + 1][row + 1] === 0) {
      grid[col + 1][row + 1] = color;
    }
  }
  color = (color + 1) % 4;

  return false;
}

function draw() {
  background(0);
  frameRate(100);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        const x = i * pixelSize;
        const y = j * pixelSize;
        fill(colorSet[grid[i][j]]);
        square(x, y, pixelSize);
      }
    }
  }

  const nextGen = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] > 0) {
        nextGen[i][j] = 0;
        if (j + 1 < rows) {
          const below = grid[i][j + 1];
          if (below === 0) {
            nextGen[i][j + 1] = grid[i][j];
          } else {
            const belowLeft = i - 1 >= 0 && j + 1 < rows ? grid[i - 1][j + 1] : 1;
            const belowRight = i + 1 < cols && j + 1 < rows ? grid[i + 1][j + 1] : 1;
            const leftOrRight = random([0, 1]);
            if (belowRight === 0 && leftOrRight === 0) {
              nextGen[i + 1][j + 1] = grid[i][j];
            } else if (belowLeft === 0 && leftOrRight === 1) {
              nextGen[i - 1][j + 1] = grid[i][j];
            } else {
              nextGen[i][j] = grid[i][j];
            }
          }
        } else {
          nextGen[i][j] = grid[i][j];
        }
      }
    }
  }

  grid = nextGen;
}
