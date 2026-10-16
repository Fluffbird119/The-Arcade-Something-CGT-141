// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var triOffset = 150;

var tri1X = 400;
var tri1Y = 650;
var tri2X = tri1X + triOffset;
var tri2Y = 650;
var tri3X = tri2X + triOffset;
var tri3Y = 650;

// happens once on the project running
function setup() {
    createCanvas(canvasX, canvasY);
}

// runs 60 times a second to update things on screen
function draw() {
    background(173, 216, 230);
    textAlign(CENTER, CENTER);

    fill("grey");
    rect(0, 650, canvasX, 100);

    stroke("black");

    makeTriangle(tri1X, tri1Y, 60, 100);

    makeTriangle(tri2X, tri2Y, 60, 100);

    makeTriangle(tri3X, tri3Y, 60, 100);

    mouseXYPositions("black");
}

function keyPressed() {
    if (keyCode == EscapeKeyCode) {
        ClosePage();
    }
}