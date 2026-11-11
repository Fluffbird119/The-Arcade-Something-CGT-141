// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var eggX = canvasX/2;
var eggY = canvasY/2;
var eggWidth = 150;
var eggHeight = 200;
var buttonWidth = 125;
var buttonHeight = 50;
var buttonX = canvasX/2 - buttonWidth/2;
var buttonY = canvasY-125 - buttonHeight/2;


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

    rect(buttonX,buttonY,buttonWidth,buttonHeight);
    textSize(20);
    text("Store",canvasX/2,canvasY=625);

    mouseXYPositions("black");
}

function mousePressed(){
    if(MouseIsInsideBox(buttonX,buttonY,buttonWidth,buttonHeight)){
        OpenPage("jorgestore.html");
    }

    if(dist(mouseX,mouseY,eggX,eggY) < 85)
    {
        score=score+1;
        console.log("bug")
    }

}

function keyPressed(){
    if(keyCode == EscapeKeyCode){
        ClosePage();
    }
}
//session storage