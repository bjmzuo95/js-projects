let board = [
    ['O', 'X', 'X'],
    ['O', 'O', 'X'],
    ['O', 'X', 'O'],
];

let players = ['O', 'X'];
let currentPlayer;

function setup() {
    createCanvas(400, 400);
    currentPlayer = random(players);
}

function draw() {
    background(255);
    strokeWeight(3);

    let w = width / 3;
    let h = height / 3;

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * j + w / 2;
            let y = h * i + h / 2;
            let spot = board[i][j];

            if (spot == players[0]) {
                noFill();
                ellipse(x, y, w / 2);
            } else if (spot == players[1]) {
                let xr = w / 4;
                line(x - xr, y - xr, x + xr, y + xr);
                line(x + xr, y - xr, x - xr, y + xr);
            }

            // textSize(32);
            // text(spot, x, y);
        }
    }
}