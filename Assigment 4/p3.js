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
  