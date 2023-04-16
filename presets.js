const hexagon = ({ displacement = 0 } = {}) => {
  const particles = [
    new Particle(75, 200, 1),
    new Particle(150, 100, 1),
    new Particle(300, 100, 1),
    new Particle(375, 200, 1),
    new Particle(300, 300, 1),
    new Particle(150, 300, 1),
    new Particle(200, 200, 1),
  ].map((circle) => {
    circle.pos.x += displacement;
    return circle;
  });
  const springs = [];

  const conn = 100;
  const k = 2;
  for (let i = 0; i < particles.length - 1; i++) {
    springs.push(
      new Spring(particles[i], particles[particles.length - 1], k, conn)
    );
    if (i !== particles.length - 2) {
      springs.push(new Spring(particles[i], particles[i + 1], k + 0.2, conn));
    }
  }
  springs.push(
    new Spring(particles[0], particles[particles.length - 2], k + 0.2, conn)
  );

  return new Polygon({ particles, springs });
};

const linePreset = (flexed = true) => {
  const circles = [];
  const connections = [];

  circles.push(new Particle(100, 100, 1, true));
  circles.push(new Particle(300, 100, 1));

  const length = flexed ? 100 : undefined;

  connections.push(new Spring(circles[0], circles[1], 0.5, length, true));

  return { circles, connections };
};

const trianglePreset = (flexed = true) => {
  const circles = [];
  const connections = [];

  circles.push(new Particle(100, 100, 1, true));
  circles.push(new Particle(300, 100, 1));
  circles.push(new Particle(200, 200, 1));

  const length = flexed ? 100 : undefined;

  connections.push(new Spring(circles[0], circles[1], 1, length, true));
  connections.push(new Spring(circles[1], circles[2], 1, length));
  connections.push(new Spring(circles[2], circles[0], 1, length));

  return { circles, connections };
};
