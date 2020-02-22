let grid;
let grid_new;
let score = 0;

function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                return false;
            }
            if (i != 3 && grid[i][j] == grid[i + 1][j]) {
                return false;
            }
            if (j != 3 && grid[i][j] == grid[i][j + 1]) {
                return false;
            }
        }
    }
    return true;
}

function isGameWon() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 2048) {
                return true;
            }
        }
    }
    return false;
}

function setup() {
    createCanvas(400, 400);
    noLoop();
    grid = blankGrid();
    grid_new = blankGrid();
    addNumber();
    addNumber();
    updateCanvas();
}

function updateCanvas() {
    background(255);
    drawGrid();
    select('#score').html(score);
}

function drawGrid() {
    let w = width / 4;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            let val = grid[i][j];
            let s = val.toString();
            stroke(0);

            if (grid_new[i][j] == 1) {
                stroke(200, 100, 200);
                strokeWeight(6);
                grid_new[i][j] = 0;
            } else {
                strokeWeight(2);
                stroke(0);
            }

            if (val != 0) {
                fill(colorsSizes[s].color);
            } else {
                noFill();
            }
            rect(i * w, j * w, w, w, 30);

            if (grid[i][j] != 0) {
                textAlign(CENTER, CENTER);
                // let fs = map(log(val), 0, log(2048), 64, 16);
                // let len = s.length - 1;
                // let sizes = [64, 64, 48, 32];
                noStroke();
                fill(0);
                textSize(colorsSizes[s].size);
                text(val, i * w + w / 2, j * w + w / 2);
            }
        }
    }
}

function keyPressed() {
    console.log(keyCode);
    let flipped = false;
    let rotated = false;
    let played = true;

    if (keyCode === DOWN_ARROW) {
        // DO NOTHING
    } else if (keyCode === UP_ARROW) {
        grid = flipGrid(grid);
        flipped = true;
    } else if (keyCode === RIGHT_ARROW) { 
        grid = rotateGrid(grid);
        rotated = true;
    } else if (keyCode === LEFT_ARROW) {
        grid = rotateGrid(grid);
        grid = flipGrid(grid);
        flipped = true;
        rotated = true;
    } else {
        played = false;
    }

    if (played) {
        let past = copyGrid(grid);
        for (let i = 0; i < 4; i++) {
            grid[i] = operate(grid[i]);
        }
        if (flipped) {
            grid = flipGrid(grid);
        }
        if (rotated) {
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
            grid = rotateGrid(grid);
        }

        if (compare(past, grid)) {
            addNumber();
        }

        updateCanvas();
        if (isGameOver()) {
            console.log('GAME OVER');
        }
        if (isGameWon()) {
            console.log('GAME WON');
        }
    }
}

function flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
        grid[i].reverse();
    }
    return grid;
}

function rotateGrid(grid) {
    let newGrid = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    return newGrid;
}

function copyGrid(grid) {
    let past = blankGrid();
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            past[i][j] = grid[i][j];
        }
    }
    return past;
}

function compare(a, b) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (a[i][j] != b[i][j]) {
                return true;
            }
        }
    }
    return false;
}

function operate(row) {
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}

function slide(row) {
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row) {
    for (let i = 3; i >= 1; i--) {
        let a = row[i];
        let b = row[i - 1];
        if (a == b) {
            row[i] = a + b;
            score += row[i];
            row[i - 1] = 0;
        }
    }
    return row;
}

function addNumber() {
    let options = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] == 0) {
                options.push({
                    x : i,
                    y : j
                });
            }
        }
    }

    if (options.length > 0) {
        let spot = random(options);
        grid[spot.x][spot.y] = random(1) > 0.1 ? 2 : 4;
        grid_new[spot.x][spot.y] = 1;
    }
}
