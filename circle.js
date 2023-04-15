class Circle {
  constructor(x, y, m, debug = false) {
    this.pos = createVector(x, y);
    this.r = m * 20;
    this.v = createVector(0, 0);
    this.m = Math.max(m / 3, 1);
    this.f = createVector(0, 0);
    this.debug = debug;
    this.forcedFill = undefined;
  }

  render() {
    strokeWeight(2);
    if (this.forcedFill) {
      stroke(this.forcedFill), fill(this.forcedFill);
    } else if (this.debug) {
      stroke("#0f0"), fill("#0f0");
    } else {
      stroke("#aaa");
      fill("#aaa");
    }
    circle(this.pos.x, this.pos.y, this.r);
  }

  setPos(pos) {
    this.pos = pos;
  }

  log(...d) {
    this.debug && console.log(...d);
  }

  addForce(f) {
    this.f.add(f.div(this.m));
  }

  addGravityForce() {
    this.f.add(createVector(0, gravity));
  }

  applyForce() {
    this.v.add(this.f);
    this.v.setMag(this.v.mag() * 0.9);
    this.f = createVector(0, 0);
  }

  applyVelocity() {
    this.pos.add(this.v);
  }

  checkGround() {
    this.pos.x = Math.max(Math.min(this.pos.x, windowWidth), 0);
    this.pos.y = Math.max(Math.min(this.pos.y, windowHeight), 0);
  }
}
