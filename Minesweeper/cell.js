class Cell {

  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;

    if (random(1) < 0.15) {
      this.bee = true;
    } else {
      this.bee = false;
    }

    this.revealed = false;
    this.marked = false;
    this.neighborCount = 0;
  }

  show() {
    stroke(0);
    fill(255);
    if (!this.marked) {
      rect(this.x, this.y, this.w, this.w);
    } else {
      fill(255, 0, 0);
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
    }

    if (this.revealed) {
      if (this.bee) {
        fill(127);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          fill(50);
          textSize(this.w - 5);
          text(this.neighborCount, this.x + this.w / 4, this.y + this.w * 0.8);
        }
      }
    }
  }

  contains(x, y) {
    let req1 = (x > this.x && x < this.x + this.w);
    let req2 = (y > this.y && y < this.y + this.w);
    return req1 && req2;
  }

  reveal() {
    this.revealed = true;
    if (this.neighborCount == 0) {
      this.floodFill();
    }
  }

  countBees() {
    if (this.bee) {
      this.neighborCount = -1
      return;
    }

    let total = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let ioff = this.i + i;
        let joff = this.j + j;

        if (ioff > -1 && ioff < col && joff > -1 && joff < row) {
          let neighbor = grid[ioff][joff];
          if (neighbor.bee) {
            total++;
          }
        }
      }
    }

    this.neighborCount = total;
  }

  floodFill() {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        let ioff = this.i + i;
        let joff = this.j + j;

        if (ioff > -1 && ioff < col && joff > -1 && joff < row) {
          let neighbor = grid[ioff][joff];
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
  }

}