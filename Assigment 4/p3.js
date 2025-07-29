// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}
// ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;           // x-coordinate (center of ball)
    this.y = y;           // y-coordinate
    this.velX = velX;     // x velocity (movement per frame)
    this.velY = velY;     // y velocity
    this.color = color;   // fill color
    this.size = size;     // radius of the ball
  }
  // Draw the ball on the canvas
  draw() {
    ctx.beginPath(); // Start drawing a new shape
    ctx.fillStyle = this.color; // Set fill color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); // Draw a circle
    ctx.fill(); // Fill the circle
  }
  // Update ball's position and bounce off edges
  update() {
    // Bounce off right or left edge
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }
 // Bounce off bottom or top edge
    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }
    // Move the ball
    this.x += this.velX;
    this.y += this.velY;
  }
   // Detect collision with other balls
  collisionDetect() {
    for (const otherBall of balls) {
      // Don't check against itself
      if (this !== otherBall) {
        const dx = this.x - otherBall.x;
        const dy = this.y - otherBall.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // If distance between centers is less than sum of radii → collision
        if (distance < this.size + otherBall.size) {
          // Change both ball colors on collision
          this.color = otherBall.color = randomRGB();
        }
      }
    }
  }
}
// ======== 4. CREATE BALLS ========

// Array to hold all ball objects
const balls = [];

// Create 25 random balls
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(size, width - size),   // x
    random(size, height - size),  // y
    random(-7, 7),                // velX
    random(-7, 7),                // velY
    randomRGB(),                  // color
    size                          // size
  );
  balls.push(ball);
}

// ======== 5. ANIMATION LOOP ========

function loop() {
  // Draw translucent black over the canvas (creates motion trails)
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  // For every ball: draw it, update its position, and check collisions
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  // Repeat the loop
  requestAnimationFrame(loop);
}

// Start the animation
loop();

