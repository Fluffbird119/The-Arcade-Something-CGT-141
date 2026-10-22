// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var buttonWidth = 150;
var buttonHeight = 75;

var jayGameButtonX = (canvasX - buttonWidth) / 2;
var jayGameButtonY = canvasY / 10;
var devGameButtonX = (canvasX - buttonWidth) / 9;
var devGameButtonY = (canvasY * 13) / 30;
var griffGameButtonX = ((canvasX - buttonWidth) * 8) / 9;;
var griffGameButtonY = (canvasY * 13) / 30;
var jorgeGameButtonX = (canvasX - buttonWidth) / 4;
var jorgeGameButtonY = (canvasY * 23) / 30;
var sandyGameButtonX = ((canvasX - buttonWidth) * 3) / 4;
var sandyGameButtonY = (canvasY * 23) / 30;

// happens once on the project starting
function setup()
{ 
  createCanvas(canvasX, canvasY); 
}

// runs 60 times a second to update things on screen
function draw()
{
  background(181, 116, 222); 
  fill(124, 185, 9);

  textAlign(CENTER, CENTER);
  textSize(50); 
  text("The Arcade Something", canvasX / 2, canvasY / 3);

  ButtonsAndText();

  mouseXYPositions("black");
}

// the visuals for the buttons and text of the main menu
function ButtonsAndText() {
  textSize(24);

  // alternate between checking if mouse is in a box and then drawing box with new color if so
  if (MouseIsInsideBox(jayGameButtonX, jayGameButtonY, buttonWidth, buttonHeight)) {
    fill("orange");
  }
  rect(jayGameButtonX, jayGameButtonY, buttonWidth, buttonHeight);
  fill("black");
  text("jay game", jayGameButtonX + buttonWidth / 2, jayGameButtonY + buttonHeight / 2);

  // then reset color so only the box with mouse on it is different color
  fill(124, 185, 9); 

  if (MouseIsInsideBox(devGameButtonX, devGameButtonY, buttonWidth, buttonHeight)) {
    fill("orange");
  }
  rect(devGameButtonX, devGameButtonY, buttonWidth, buttonHeight);
  fill("black");
  text("dev game", devGameButtonX + buttonWidth / 2, devGameButtonY + buttonHeight / 2);

  fill(124, 185, 9); 

  if (MouseIsInsideBox(griffGameButtonX, griffGameButtonY, buttonWidth, buttonHeight)) {
    fill("orange");
  }
  rect(griffGameButtonX, griffGameButtonY, buttonWidth, buttonHeight);
  fill("black");
  text("griff game", griffGameButtonX + buttonWidth / 2, griffGameButtonY + buttonHeight / 2);

  fill(124, 185, 9); 

  if (MouseIsInsideBox(jorgeGameButtonX, jorgeGameButtonY, buttonWidth, buttonHeight)) {
    fill("orange");
  }
  rect(jorgeGameButtonX, jorgeGameButtonY, buttonWidth, buttonHeight);
  fill("black");
  text("jorge game", jorgeGameButtonX + buttonWidth / 2, jorgeGameButtonY + buttonHeight / 2);

  fill(124, 185, 9); 

  if (MouseIsInsideBox(sandyGameButtonX, sandyGameButtonY, buttonWidth, buttonHeight)) {
    fill("orange");
  }
  rect(sandyGameButtonX, sandyGameButtonY, buttonWidth, buttonHeight);
  fill("black");
  text("sandy game", sandyGameButtonX + buttonWidth / 2, sandyGameButtonY + buttonHeight / 2);
}

// this is an inbuilt function that fires whenever you press a key
function keyPressed() {
  if (keyCode == EscapeKeyCode) {
    ClosePage();
  }
}

function mousePressed() {
  // navigate to different pages based on what button is pressed
  if (MouseIsInsideBox(jayGameButtonX, jayGameButtonY, buttonWidth, buttonHeight)) {
    OpenPage("jaysgame.html")
  }
  else if (MouseIsInsideBox(devGameButtonX, devGameButtonY, buttonWidth, buttonHeight)) {
    OpenPage("devsgame.html")
  } 
  else if (MouseIsInsideBox(griffGameButtonX, griffGameButtonY, buttonWidth, buttonHeight)) {
    OpenPage("griffsgame.html")
  } 
  else if (MouseIsInsideBox(jorgeGameButtonX, jorgeGameButtonY, buttonWidth, buttonHeight)) {
    OpenPage("jorgesgame.html")
  }
  else if (MouseIsInsideBox(sandyGameButtonX, sandyGameButtonY, buttonWidth, buttonHeight)) {
    OpenPage("sandysgame.html")
  }
}