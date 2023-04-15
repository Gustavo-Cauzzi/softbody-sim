const hexagon = () => {
  const circles = [];
  const connections = [];
  circles.push(new Circle(75, 200, 1));
  circles.push(new Circle(150, 100, 1));
  circles.push(new Circle(300, 100, 1));
  circles.push(new Circle(375, 200, 1));
  circles.push(new Circle(300, 300, 1));
  circles.push(new Circle(150, 300, 1));

  circles.push(new Circle(200, 200, 1));

  const conn = 100;
  const k = 2;
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

  return { connections, circles };
};

const linePreset = (flexed = true) => {
  const circles = [];
  const connections = [];

  circles.push(new Circle(100, 100, 1, true));
  circles.push(new Circle(300, 100, 1));

  const length = flexed ? 100 : undefined;

  connections.push(new Connection(circles[0], circles[1], 0.5, length, true));

  return { circles, connections };
};

const trianglePreset = (flexed = true) => {
  const circles = [];
  const connections = [];

  circles.push(new Circle(100, 100, 1, true));
  circles.push(new Circle(300, 100, 1));
  circles.push(new Circle(200, 200, 1));

  const length = flexed ? 100 : undefined;

  connections.push(new Connection(circles[0], circles[1], 1, length, true));
  connections.push(new Connection(circles[1], circles[2], 1, length));
  connections.push(new Connection(circles[2], circles[0], 1, length));

  return { circles, connections };
};
