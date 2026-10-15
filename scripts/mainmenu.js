// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var x;
var y;

// happens once on the project running
function setup()
{ 
  createCanvas(canvasX, canvasY); 

  x = 50;
  y = 50;
}

// runs 60 times a second to update things on screen
function draw()
{
  background(181,116,222); 
  fill(124,185,9); 
  textSize(50); 
  text("hello im jay", 100,250);

  ellipse(x, y, 100, 100);

  mouseXYPositions("black");
}

// this is an inbuilt function that fires whenever you press a key
function keyPressed() {
  if (keyCode == SpaceBarKeyCode) {
    OpenPage('jaysgame.html')
  } 
  else if (keyCode == EscapeKeyCode) {
    ClosePage();
  }
}