let dino;
let dImg;
let tImg;
let bImg;
let trains = [];

function preload() {
  dImg = loadImage('./characters/Triangle_Run.png');
  tImg = loadImage('./characters/Dot_Train_Run.png');
  bImg = loadImage('./backgrounds/Background_PurpleHillsSunClouds.jpg');
}

function setup() {
  createCanvas(800, 450);
  dino = new Dinosaur();
}

function draw() {
  background(bImg);
  if (random(1) < 0.007) {
    trains.push(new Train());
  }
  for (let t of trains) {
    t.move();
    t.show();
    if (dino.hits(t)) {
      console.log('game over');
      noLoop();
    }
  }
  dino.show();
  dino.move();
}

function keyPressed() {
  if (key == ' ') {
    dino.jump();
  }
}