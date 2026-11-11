// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

// happens once on the project running
function setup() {
    createCanvas(canvasX, canvasY);
    textAlign(CENTER, CENTER);
}

function draw(){
    background("green");
}

function keyPressed(){
    if(keyCode == EscapeKeyCode){
        ClosePage();
    }
}