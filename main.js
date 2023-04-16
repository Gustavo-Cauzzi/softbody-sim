let c1, c2, cn1;
const polygons = [];
const springDrag = 0.95;
const gravity = 9.8 / 10;

document.addEventListener("contextmenu", (e) => e.preventDefault());

function setup() {
  createCanvas(windowWidth, windowHeight);

  polygons.push(
    ...[
      hexagon(),
      hexagon({ displacement: 300 }),
      /*
      trianglePreset(false), 
      linePreset(false) ,
      */
    ]
  );
}

function draw() {
  background(220);
  fill("#aaa");
  stroke("#aaa");

  polygons.forEach((polygon) => {
    polygon.render();
    polygon.calculateForces();
  });

  moveBallWithMouseCheck();
}

let grabbedParticle;
function moveBallWithMouseCheck() {
  if (mouseIsPressed) {
    const currentGrabbedParticle =
      grabbedParticle ??
      polygons
        .map((polygon) =>
          polygon.particles.find(
            (circle) =>
              dist(mouseX, mouseY, circle.pos.x, circle.pos.y) <= circle.r
          )
        )
        .find(isTruthy);

    if (currentGrabbedParticle) {
      grabbedParticle = currentGrabbedParticle;

      if (mouseButton === LEFT) {
        const force = createVector(mouseX, mouseY)
          .sub(createVector(grabbedParticle.pos.x, grabbedParticle.pos.y))
          .mult(MOUSE_GRAB_FORCE_MULTIPLIER);

        grabbedParticle.addForce(force);

        stroke("#f00");
        line(
          grabbedParticle.pos.x,
          grabbedParticle.pos.y,
          grabbedParticle.pos.x + force.x,
          grabbedParticle.pos.y + force.y
        );
      } else {
        grabbedParticle.setPos(createVector(mouseX, mouseY));
      }
    }
  } else {
    if (grabbedParticle) {
      grabbedParticle.forcedFill = undefined;
      grabbedParticle = null;
    }
  }
}
