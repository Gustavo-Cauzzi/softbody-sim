class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = 1;
    this.v = createVector(0, 0);
    this.f = createVector(0, 0);
  }

  render() {
    strokeWeight(2);
    circle(this.x, this.y, this.r);
  }

  addPos(vec) {
    this.x += vec.x;
    this.y += vec.y;
  }

  gravity() {
    this.v.add(createVector(0, systemGravity));
  }

  endFrame() {
    this.f = createVector(0, 0);
    this.v = createVector(0, 0);
  }

  addForce(f) {
    this.v.add(f);
  }

  applyForce() {
    this.addPos(this.v);
  }

  checkGround() {
    // const pastX = this.x;
    // const pastY = this.y;
    this.x = Math.min(Math.max(this.x, 0), windowWidth);
    this.y = Math.min(Math.max(this.y, 0), windowHeight);

    // if (pastX === this.x) {
    //   this.v.x = 0;
    // }
    // if (pastY === this.y) {
    //   this.v.y = 0;
    // }
  }
}
