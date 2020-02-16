let grid;

function blankGrid() {
    return [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

function setup() {
    createCanvas(400, 400);
    grid = blankGrid();
    console.table(grid);
    addNumber();
    addNumber();
    console.table(grid);
}

function draw() {
    background(255);
    drawGrid();
}

function drawGrid() {
    let w = width / 4;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(i * w, j * w, w, w);

            let val = grid[i][j];
            if (grid[i][j] != 0) {
                textAlign(CENTER, CENTER);
                textSize(64);
                fill(0);
                noStroke();
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

    if (options.length > 0);
    let spot = random(options);
    grid[spot.x][spot.y] = random(1) > 0.5 ? 2 : 4;
}