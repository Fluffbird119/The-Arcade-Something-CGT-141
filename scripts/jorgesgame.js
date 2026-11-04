// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var eggX = canvasX/2;
var eggY = canvasY/2;
var eggWidth = 150;
var eggHeight = 200;

var score = 0;
var scoreTextSize = 20;
var playerTutorial = true;

// happens once on the project running
function setup() {
    createCanvas(canvasX, canvasY);
    textAlign(CENTER, CENTER);
}

// runs 60 times a second to update things on screen
function draw() {
    background("tan")

    fill("white")
    strokeWeight(5)
    stroke("black")
    ellipse(eggX,eggY,eggWidth,eggHeight);

    textSize(20);
    text("Click on the Egg!",canvasX/2,canvasY/10);

    textSize(20);
    text("Score - " + score,canvasX/2,canvasY/7);

    mouseXYPositions("black");
}
//session storage