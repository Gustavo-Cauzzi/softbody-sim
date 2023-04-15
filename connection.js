class Connection {
  constructor(circle1, circle2, k, length) {
    this.circle1 = circle1;
    this.circle2 = circle2;
    this.k = k;
    this.v = createVector(0, 0);
    this.length =
      length ??
      dist(this.circle1.x, this.circle1.y, this.circle2.x, this.circle2.y);

    this.force = 0; // F = kx
  }

  render() {
    strokeWeight(3);
    line(this.circle1.x, this.circle1.y, this.circle2.x, this.circle2.y);
  }

  calculateForce() {
    const deltaLength =
      this.length -
      dist(this.circle1.x, this.circle1.y, this.circle2.x, this.circle2.y);

    const force = (this.k * deltaLength) / 10;

    const v2 = createVector(this.circle1.x, this.circle1.y);
    const v1 = createVector(this.circle2.x, this.circle2.y);

    this.force = force;
    const acc = v1.sub(v2).setMag(force);
    this.v = this.v.add(acc);
    this.v = this.v.setMag(this.v.mag() * springDrag);
    this.circle1.addForce(createVector(-this.v.x, -this.v.y));
    this.circle2.addForce(this.v);
  }
}
