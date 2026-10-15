// this script can be used to hold vars that every script will need / something that needs to be consistent between games like canvas size
// this is so there is only one place that we have to edit these vars to affect every game


// ALSO: I will put useful functions in here that can help with debugging / making the websiter so be sure to check back here
var CanvasX = 850;
var CanvasY = 750;

var SpaceBarKeyCode = 32;
var WKeyCode = 87;
var AKeyCode = 65;
var SKeyCode = 83;
var DKeyCode = 68;
var EscapeKeyCode = 27;

function GetCanvasX() {
    return CanvasX;
}

function GetCanvasY() {
    return CanvasY;
}

function OpenPage(pageName) {
    window.open(pageName, "_self");
}

function ClosePage() {
    //window.close();
    history.back();
}

// call this and pass in the name of the color you want the text to be ex: "black" to see the position of your mouse position displayed on screen
function mouseXYPositions(colorName)
{
  // text for x and y value
  noStroke();
  fill(colorName);
  textSize(20);
  text("x value : " + mouseX, 50, 50);
  text("y value : " + mouseY, 50, 80);
}

// call this function when the player clicks and you want to see if they clicked inside a box with position x, y and dimensions width and height
function MouseIsInsideBox(x, y, width, height) {
    if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
        return true;
    }
    else {
        return false;
    }
}

// helpful website for keycodes in javascript
// https://www.toptal.com/developers/keycode