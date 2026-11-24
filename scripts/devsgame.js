// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var circleX = 100;
var circleY = 100;
var circleD = 25;

var circleX2 = 700;
var circleY2 = 600;
var circleD2 = 25;

var circleX3 = 100;
var circleY3 = 300;
var circleD3 = 25;

var circleX4 = 300;
var circleY4 = 200;
var circleD4 = 25;

var circleX5 = 600;
var circleY5 = 400;
var circleD5 = 25;

var circleX6 = 600;
var circleY6 = 100;
var circleD6 = 25;

var circleX7 = 100;
var circleY7 = 80;
var circleD7 = 25;

var circleX8 = 350;
var circleY8 = 600;
var circleD8 = 25;

// happens once on the project running
function setup() {
    createCanvas(canvasX, canvasY);
}

// runs 60 times a second to update things on screen
function draw() {
    background(110,150,200);
    circle(circleX,circleY,circleD);
    circleX = circleX + 4;
    fill("red");

    circle(circleX2,circleY2,circleD2);
    circleX2 = circleX2 - 2;
    mouseXYPositions("black");

    circle(circleX3,circleY3,circleD3);
    circleX3 = circleX3 + 3;
    fill("green");

    circle(circleX4,circleY4,circleD4);
    circleX4 = circleX4 - 2;
    fill("blue");

    circle(circleX5,circleY5,circleD5);
    circleX5 = circleX5 - 3;
    fill("purple");

    circle(circleX6,circleY6,circleD6);
    circleY6 = circleY6 + 3;
    fill("orange");

    circle(circleX7,circleY7,circleD7);
    circleY7 = circleY7 + 3;
    fill("brown");

    circle(circleX8,circleY8,circleD8);
    circleY8 = circleY8 - 2;
    fill("pink");
}

function keyPressed() {
    if(keyCode == EscapeKeyCode)
        ClosedPage();
}

function mousePressed() {
    if(MouseIsInsideBox(circleX, circleY, circleD, circleD)) {
        console.log("Mouse clicked inside the circle");

    }
}