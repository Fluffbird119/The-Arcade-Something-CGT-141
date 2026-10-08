// this script can be used to hold vars that every script will need / something that needs to be consistent between games like canvas size
// this is so there is only one place that we have to edit these vars to affect every game


// ALSO: I will put useful functions in here that can help with debugging / making the websiter so be sure to check back here
var CanvasX = 842;
var canvasY = 734;

function GetCanvasX() {
    return canvasX;
}

function GetCanvasY() {
    return canvasY;
}

// call this and pass in the name of the color you want the text to be ex: "black" to see the position of your mouse position displayed on screen
function mouseXYPositions(colorName)
{
  // text for x and y value
  noStroke();
  fill(colorName);
  textSize(20);
  textFont(dsfont)
  text("x value : "+mouseX, 50,50);
  text("y value : "+mouseY, 50,80);
  text("bait : "+bait,50,110);
  text("sw : "+sw,50,140);
}