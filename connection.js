class Connection {
  constructor(circle1, circle2, k, length, debug = false) {
    this.circle1 = circle1;
    this.circle2 = circle2;
    this.k = k;
    this.v = createVector(0, 0);
    this.length =
      length ??
      dist(
        this.circle1.pos.x,
        this.circle1.pos.y,
        this.circle2.pos.x,
        this.circle2.pos.y
      );
    this.debug = debug;
  }

  log(...d) {
    this.debug && console.log(...d);
  }

  render() {
    strokeWeight(2);
    if (this.debug) stroke("#f00");
    else stroke("#aaa");

    line(
      this.circle1.pos.x,
      this.circle1.pos.y,
      this.circle2.pos.x,
      this.circle2.pos.y
    );
  }

  calculateForce() {
    const deltaLength =
      this.length -
      dist(
        this.circle1.pos.x,
        this.circle1.pos.y,
        this.circle2.pos.x,
        this.circle2.pos.y
      );

    const kDamping = this.calculateDamping();
    const force = (this.k / 10) * deltaLength + 0;

    const v2 = createVector(this.circle1.pos.x, this.circle1.pos.y);
    const v1 = createVector(this.circle2.pos.x, this.circle2.pos.y);

    const fVec = v1.sub(v2).setMag(force);
    // this.log("force: ", force, this.k, deltaLength, "\n", fVec);
    // console.log("fVec: ", fVec);
    // this.v = this.v.add(f);
    // this.v = this.v.setMag(this.v.mag() * springDrag);

    // console.log("fVec: ", fVec);

    this.circle2.addForce(fVec);
    this.circle1.addForce(createVector(-fVec.x, -fVec.y));
  }

  calculateDamping() {
    const c1ToC2Direction = createVector(this.circle2.pos.x, this.circle2.pos.y)
      .sub(createVector(this.circle1.pos.x, this.circle1.pos.y))
      .normalize();

    const velocityVariation = createVector(this.circle2.v).sub(this.circle1.v);

    const damping = c1ToC2Direction.dot(velocityVariation);
    // this.log(
    //   "damping: ",
    //   damping,
    //   dist(
    //     this.circle1.pos.x,
    //     this.circle1.pos.y,
    //     this.circle2.pos.x,
    //     this.circle2.pos.y
    //   )
    // );
    return damping * this.k;
  }

  // applyForce() {
  //   this.circle1.setX(this.circle1.x - this.v.x);
  //   this.circle1.setY(this.circle1.y - this.v.y);
  //   this.circle2.setX(this.circle2.x + this.v.x);
  //   this.circle2.setY(this.circle2.y + this.v.y);
  // }
}
