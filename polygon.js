class Polygon {
  constructor({ particles = [], springs = [] }) {
    this.particles = particles;
    this.springs = springs;
  }

  render() {
    this.particles.forEach((particle) => particle.render());
    this.springs.forEach((spring) => spring.render());
  }

  calculateForces() {
    this.springs.forEach((spring) => {
      spring.calculateForce();
    });
    this.particles.forEach((particle) => {
      particle.addGravityForce();
      particle.applyForce();
      particle.applyVelocity();
      particle.checkGround();
    });
  }
}
