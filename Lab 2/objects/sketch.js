// Define two objects: one for a circle and another for a square
let circle, square;
let bgColor1, bgColor2, bgColor3;
let lerpFactor = 0;

function setup() {
    createCanvas(600, 400);
    
    // Initialize the circle and square objects
    circle = new Shape(width / 4, height / 2, 50, color(255, 0, 0), 2, 2);
    square = new Shape(3 * width / 4, height / 2, 50, color(0, 0, 255), -2, -2);

    // Define the initial background colors
    bgColor1 = color(255, 100, 100); // Red
    bgColor2 = color(100, 255, 100); // Green
    bgColor3 = color(100, 100, 255); // Blue
}

function draw() {
    // Create a smooth gradient background with three colors
    let bgColor = lerpColor(bgColor1, bgColor2, lerpFactor);
    bgColor = lerpColor(bgColor, bgColor3, lerpFactor);
    background(bgColor);

    // Update and display the circle and square
    circle.update();
    circle.display();

    square.update();
    square.display();

    // Gradually change the lerpFactor to create the animation effect
    lerpFactor += 0.005;
    if (lerpFactor > 1) {
        lerpFactor = 0;  // Reset to create a looping effect
    }
}

// Shape object that handles position, speed, and color
class Shape {
    constructor(x, y, size, col, xSpeed, ySpeed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.col = col;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    // Update position based on speed, and handle edge bouncing
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;

        // Bounce off the edges
        if (this.x > width - this.size / 2 || this.x < this.size / 2) {
            this.xSpeed *= -1;
            this.col = color(random(255), random(255), random(255));  // Change color on bounce
        }
        if (this.y > height - this.size / 2 || this.y < this.size / 2) {
            this.ySpeed *= -1;
            this.col = color(random(255), random(255), random(255));  // Change color on bounce
        }
    }

    // Display the shape on the canvas
    display() {
        fill(this.col);
        noStroke();

        // Draw a circle or square based on the object type
        if (this.size === 50) {
            ellipse(this.x, this.y, this.size);
        } else {
            rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }
}

// Reset positions of shapes when mouse is clicked
function mousePressed() {
    circle.x = width / 4;
    circle.y = height / 2;
    square.x = 3 * width / 4;
    square.y = height / 2;
}

