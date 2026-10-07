var x;
var y;

// happens once on the project running
function setup()
{ 
  createCanvas(842,734);

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

  if (keyIsPressed == true && keyCode == 70) {
    fill(0);
    x = x + 1;
  } else {
    fill(255);

  }
  ellipse(x, y, 100, 100);
}