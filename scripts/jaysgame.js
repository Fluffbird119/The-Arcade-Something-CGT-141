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

var playerX = 100;
var playerY = 550;

var gravityNum = 5; // how many pixles player is moved down each frame
var playerJumpForce = 10; // howm many pixels player moves up each frame while jumping
var playerJumping = false;
var playerJumpTime = 20; // amount of frames player is jumping for, player will move jumpForce * playerJumpTime pixels
var playerCurJumpTime = 0; // how long player has been jumping for

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

    // make spikes
    stroke("black");

    makeTriangle(tri1X, tri1Y, 60, 100);
    makeTriangle(tri2X, tri2Y, 60, 100);
    makeTriangle(tri3X, tri3Y, 60, 100);

    // player hitbox / temp player before model

    if (playerY > 550) { // 550 is default playerY for now
        playerY = 550;
    }

    if (playerJumping == true) {
        if (playerCurJumpTime < playerJumpTime) {
            playerY -= playerJumpForce;
            playerCurJumpTime += 1;
        }
        else {
            playerCurJumpTime = 0;
        }
    }
    else (playerJumping == false) {
        playerY += gravityNum;
    }
    

    fill("red");
    rect(playerX, playerY, 50, 100);

    mouseXYPositions("black");
}

function keyPressed() {
    if (keyCode == SpaceBarKeyCode) {
        playerJumping = true;
    }
    else if (keyCode == EscapeKeyCode) {
        ClosePage();
    }
}