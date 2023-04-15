let c1, c2, cn1;
const connections = [];
const circles = [];
const springDrag = 0.95;
const gravity = 9.8 / 10;

document.addEventListener("contextmenu", (e) => e.preventDefault());

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(1);

  const { circles: c, connections: cons } = hexagon();
  // const { circles: c, connections: cons } = trianglePreset(false);
  // const { circles: c, connections: cons } = linePreset(false);
  circles.push(...c);
  connections.push(...cons);
}

function draw() {
  background(220);
  fill("#aaa");
  stroke("#aaa");

  connections.forEach((cn) => cn.render());
  circles.forEach((c) => c.render());

  connections.forEach((con) => {
    con.calculateForce();
  });
  circles.forEach((c) => {
    c.addGravityForce();
    c.applyForce();
    c.applyVelocity();
    c.checkGround();
  });

  moveBallWithMouseCheck();
}

let grabbedCircle;
function moveBallWithMouseCheck() {
  if (mouseIsPressed) {
    const currentGrabbedCircle =
      grabbedCircle ??
      circles.find(
        (circle) => dist(mouseX, mouseY, circle.pos.x, circle.pos.y) <= circle.r
      );

    console.log("currentGrabbedCircle: ", currentGrabbedCircle);

    if (currentGrabbedCircle) {
      grabbedCircle = currentGrabbedCircle;

      if (mouseButton === LEFT) {
        const force = createVector(mouseX, mouseY)
          .sub(createVector(grabbedCircle.pos.x, grabbedCircle.pos.y))
          .normalize()
          .mult(6);

        grabbedCircle.addForce(force);
      } else {
        grabbedCircle.setPos(createVector(mouseX, mouseY));
      }

      console.log("line: ", line);
    }
  } else {
    if (grabbedCircle) {
      grabbedCircle.forcedFill = undefined;
      grabbedCircle = null;
    }
  }
}
