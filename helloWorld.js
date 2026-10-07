var x;

// happens once on the project running
function setup()
{ 
  createCanvas(842,734); 
}

// runs 60 times a second to update things on screen
function draw()
{
  background(181,116,222); 
  fill(124,185,9); 
  textSize(50); 
  text("hello im jay", 100,250);

  fill("red");
  ellipse(x, 50, 100, 100);
}