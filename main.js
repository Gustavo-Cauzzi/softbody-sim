const connections = [];
const circles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  //   frameRate(1);

  circles.push(new Circle(75, 200, 15));
  circles.push(new Circle(150, 100, 15));
  circles.push(new Circle(300, 100, 15));
  circles.push(new Circle(375, 200, 15));
  circles.push(new Circle(300, 300, 15));
  circles.push(new Circle(150, 300, 15));

  circles.push(new Circle(200, 200, 15));

  const conn = 100;
  const k = 0.4;
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
  circles.forEach((c) => {
    c.gravity();
    c.applyForce();
    c.checkGround();
    c.endFrame();
  });
}
