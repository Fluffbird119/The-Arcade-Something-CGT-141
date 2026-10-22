// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var playerX = 100;
var playerY = 550;
var playerWidth = 50;
var playerHeight = 100;

var terminalVelocity = 20;
var gravityForce = 5; // how many pixles player is moved down each frame
var gravityAcceleration = 1.03;
var defaultGravityForce = 5;
var playerJumpForce = 23; // howm many pixels player moves up each frame while jumping
var playerJumping = false;
var playerJumpTime = 10; // amount of frames player is jumping for, player will move jumpForce * playerJumpTime pixels
var playerCurJumpTime = 0; // how long player has been jumping for
var playerGrounded = true;
var playerLost = false;

var playerTutorial = true;

var floorY = 550;
var ceilingY;

let spikeOffset = 400;
var spikeList = [];

// happens once on the project running
function setup() {
    createCanvas(canvasX, canvasY);

    ceilingY = floorY - 350; // since floor and ceiling are always 350 units apart now you can shift the play space with just one var change

    // make spkies
    let spikeY = floorY;
    let spikeX = canvasX - spikeOffset;
    let spikeWidth = 60;
    let spikeHeight = 100;
    let spikeSpeed = 5.5;

    for (let i = 0; i < 3; i++) {
        spikeX += spikeOffset;
        spikeList[i] = new Triangle(spikeX, spikeY, spikeWidth, spikeHeight, spikeSpeed);
    }
}

// runs 60 times a second to update things on screen
function draw() {
    background(173, 216, 230);
    textAlign(CENTER, CENTER);

    fill("grey");
    rect(0, floorY, canvasX, canvasY - floorY);
    rect(0, 0, canvasX, ceilingY);

    // player object
    fill("red");
    stroke("black");
    rect(playerX, playerY - playerHeight, playerWidth, playerHeight);

    if (playerTutorial == true) {

        // dont run the rest of the code if the player is in the tutorial
        return;
    }

    if (playerLost == true) {
        fill("black")
        textSize(50);
        text("You lose", canvasX / 2, canvasY / 2);
        textSize(20);
        text("Press any button to exit", canvasX / 2, 50 + canvasY / 2);

        // dont run the rest of the code if the player is dead
        return;
    }

    // move spikes only run all the game code when player hasnt lost and isnt in tutorial
    for (var spike of spikeList) {
        spike.update();

        if (spike.hittingPlayer()) {
            playerLost = true;
        }
    }

    // player hitbox / temp player before model

    // jumping code
    if (playerJumping == true) {
        if (playerCurJumpTime < playerJumpTime) {
            playerY -= playerJumpForce;
            playerCurJumpTime += 1;
        }
        else {
            playerCurJumpTime = 0;
            playerJumping = false;
        }
    }
    else if (playerGrounded == false) {
        gravityForce *= gravityAcceleration;
        if (gravityForce > terminalVelocity) {
            gravityForce = terminalVelocity;
        }
        playerY += gravityForce;
    }
    else {
        gravityForce = defaultGravityForce;
        playerY = floorY - playerHeight;
    }

    if (playerY > floorY - playerHeight) {
        playerY = floorY - playerHeight;
    }

    if (playerY >= floorY - playerHeight) {
        playerGrounded = true;
    }

    mouseXYPositions("black");
}

function keyPressed() {
    if (keyCode == SpaceBarKeyCode && playerGrounded == true) {
        playerGrounded = false;
        playerJumping = true;
    }
    else if (keyCode == EscapeKeyCode) {
        ClosePage();
    }
    else if (playerLost == true) {
        console.log("thing");
        ClosePage();
    }
}

function mousePressed() {
    if (playerLost == true) {
        ClosePage();
    }
}