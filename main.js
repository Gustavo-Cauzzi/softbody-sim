let c1, c2, cn1;
const connections = [];
const circles = [];
const springDrag = 0.9;

function setup() {
  createCanvas(windowWidth, windowHeight);

  circles.push(new Circle(75, 200, 15));
  circles.push(new Circle(150, 100, 15));
  circles.push(new Circle(300, 100, 15));
  circles.push(new Circle(375, 200, 15));
  circles.push(new Circle(300, 300, 15));
  circles.push(new Circle(150, 300, 15));

  circles.push(new Circle(200, 200, 15));

  //   circles.forEach((circle, i) => {
  //     for (let j = i + 1; j < circles.length; j++) {
  //       connections.push(new Connection(circle, circles[j], 0.2, 200));
  //     }
  //   });

  const conn = 100;
  const k = 0.5;
  for (let i = 0; i < circles.length - 1; i++) {
    connections.push(
      new Connection(circles[i], circles[circles.length - 1], k, conn)
    );
    if (i !== circles.length - 2) {
      connections.push(
        new Connection(circles[i], circles[i + 1], k + 0.2, conn)
      );
    }
  }
  connections.push(
    new Connection(circles[0], circles[circles.length - 2], k + 0.2, conn)
  );
}

function draw() {
  background(220);
  fill("#aaa");
  stroke("#aaa");

  if (mouseIsPressed) {
    circles[circles.length - 1].x = mouseX;
    circles[circles.length - 1].y = mouseY;
  }

  circles.forEach((c) => c.render());
  connections.forEach((cn) => cn.render());

  connections.forEach((con) => {
    con.calculateForce();
  });
  connections.forEach((con) => {
    con.applyForce();
  });
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.m = 1;
  }

  render() {
    strokeWeight(2);
    circle(this.x, this.y, this.r);
  }

  setX(x) {
    this.x = Math.min(Math.max(x, 0), windowWidth);
  }

  setY(y) {
    this.y = Math.min(Math.max(y, 0), windowHeight);
  }
}

class Connection {
  constructor(circle1, circle2, k, length) {
    this.circle1 = circle1;
    this.circle2 = circle2;
    this.k = k;
    this.v = createVector(0, 0);
    this.length =
      length ??
      dist(this.circle1.x, this.circle1.y, this.circle2.x, this.circle2.y);
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

    const acc = v1.sub(v2).setMag(force);
    this.v = this.v.add(acc);
    this.v = this.v.setMag(this.v.mag() * springDrag);
  }

  applyForce() {
    this.circle1.setX(this.circle1.x - this.v.x);
    this.circle1.setY(this.circle1.y - this.v.y);
    this.circle2.setX(this.circle2.x + this.v.x);
    this.circle2.setY(this.circle2.y + this.v.y);
  }
}
