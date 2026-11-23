// these will be our standard canvas size for now might change later
var canvasX = GetCanvasX();
var canvasY = GetCanvasY();

var floorY = 550;
var ceilingY;

var playerWidth = 50;
var playerHeight = 100;
var playerX = 100;
var playerY = floorY - playerHeight;

var terminalVelocity = 20;
var gravityForce = 2; // how many pixles player is moved down each frame
var gravityAcceleration = 0.75;
var defaultGravityForce = 5;
var playerJumpForce = 26; // howm many pixels player moves up each frame while jumping
var playerJumping = false;
var playerJumpTime = 10; // amount of frames player is jumping for, player will move jumpForce * playerJumpTime pixels
var playerCurJumpTime = 0; // how long player has been jumping for
var playerGrounded = true;
var playerLost = false;

var playerScore = 0;

var playerTutorial = true;

var spikeOffset = 400;
var spikeList = [];

let backgroundImage;

var backgroundX = 0;
var backgroundImageSpeed = 0;

var floorAndCeilingX1 = 0;
var floorAndCeilingX2 = 0;
var floorImageSpeed = 0;

// animation shit
let player_sprite_sheet;

// a special p5.js function for doing image stuff
function preload() {
  player_sprite_sheet = loadImage("../images/jaysimages/player_sprite_sheet.png");
  backgroundImage = loadImage("../images/jaysimages/jay_background.png");
  blockImage = loadImage("../images/jaysimages/block.png");
  otherBlockImage = loadImage("../images/jaysimages/block_with_holes.png");
}

// happens once on the project running
function setup() {
    frameRate(30);

    createCanvas(canvasX, canvasY);

    ceilingY = floorY - 450; // since floor and ceiling are always 450 units apart now you can shift the play space with just one var change

    // make spkies
    let spikeY = floorY;
    let spikeX = canvasX - spikeOffset;
    let spikeWidth = 60;
    let spikeHeight = 100;
    let spikeSpeed = 6;
    backgroundImageSpeed = spikeSpeed - 2; // minus 2 because background should be a lil slower than foreground
    floorImageSpeed = spikeSpeed;

    for (let i = 0; i < 3; i++) {
        spikeX += spikeOffset;
        spikeList[i] = new Spike(spikeX, spikeY, spikeWidth, spikeHeight, spikeSpeed);
    }

    textAlign(CENTER, CENTER);

    newAnim = new continuosAnimation(player_sprite_sheet, 5, 0.25, 8, 30); // yay i love magic numbers so much


    // all of these need 2 so that the background gets looped properly kinda bad but who cares
    // big combined background image
    combinedBackground = createGraphics(backgroundImage.width * 4, backgroundImage.height);
    combinedBackground2 = createGraphics(backgroundImage.width * 4, backgroundImage.height);

    // make it filled with 4 smaller images
    for (let i = 0; i < 4; i++) {
        combinedBackground.image(backgroundImage, backgroundImage.width * i, 0);
        combinedBackground2.image(backgroundImage, backgroundImage.width * i, 0);
    }

    // combinded blocks for floor / ceiling
    blockImage.resize(200, 200);
    otherBlockImage.resize(200, 200);

    floorCombinedBlock = createGraphics(blockImage.width * 5, blockImage.height);
    floorCombinedBlock2 = createGraphics(blockImage.width * 5, blockImage.height);

    for (let i = 0; i < 5; i++) {
        // add a random chance to use other block image which is same size so that floor and ceiling are procedural
        if (random(1) > 0.5) {
            floorCombinedBlock.image(blockImage, blockImage.width * i, 0);
            floorCombinedBlock2.image(otherBlockImage, blockImage.width * i, 0);
        }
        else {
            floorCombinedBlock.image(otherBlockImage, blockImage.width * i, 0);
            floorCombinedBlock2.image(blockImage, blockImage.width * i, 0);
        }
    }

    // generated roof and floor differently so theyll be different each time
    roofCombinedBlock = createGraphics(blockImage.width * 5, blockImage.height);
    roofCombinedBlock2 = createGraphics(blockImage.width * 5, blockImage.height);

    for (let i = 0; i < 5; i++) {
        // add a random chance to use other block image which is same size so that floor and ceiling are procedural
        if (random(1) > 0.5) {
            roofCombinedBlock.image(blockImage, blockImage.width * i, 0);
            roofCombinedBlock2.image(otherBlockImage, blockImage.width * i, 0);
        }
        else {
            roofCombinedBlock.image(otherBlockImage, blockImage.width * i, 0);
            roofCombinedBlock2.image(blockImage, blockImage.width * i, 0);
        }
    }

    floorAndCeilingX1 = 0;
    floorAndCeilingX2 = floorCombinedBlock.width;
}

// runs 60 times a second to update things on screen
function draw() {
    
    if (playerLost == true) {
        stroke("black");
        strokeWeight(5);
        fill("white");
        textSize(50);
        text("You lose", canvasX / 2, canvasY / 2);
        textSize(20);
        text("Press any button to exit", canvasX / 2, 50 + canvasY / 2);
 
        // dont run the rest of the code if the player is dead
        return;
    }
    strokeWeight(1);

    // background and floor and ceiling images
    image(combinedBackground, backgroundX, ceilingY);
    image(combinedBackground2, backgroundX + combinedBackground.width, ceilingY);
    
    image(floorCombinedBlock, floorAndCeilingX1, floorY);
    image(floorCombinedBlock2, floorAndCeilingX2, floorY);

    image(roofCombinedBlock, floorAndCeilingX1, -100);
    image(roofCombinedBlock2, floorAndCeilingX2, -100);

    // player object
    newAnim.update(playerX - playerWidth/1.15, playerY - 45);
    fill("red");
    stroke("black");
    //rect(playerX, playerY, playerWidth, playerHeight);

    stroke("black");
    strokeWeight(5);
    fill("white");
    textSize(30);
    text("Score: " + playerScore, 75, 50);
    strokeWeight(1);

    //mouseXYPositions("black");

    if (playerTutorial == true) {
        stroke("black");
        strokeWeight(5);
        fill("white");
        textSize(50);
        text("Controls", canvasX / 2, ceilingY + 75);
        textSize(20);
        text("Press spacebar to jump", canvasX / 2, ceilingY + 125);
        text("Press escape to exit", canvasX / 2, ceilingY + 175);
        text("Avoid the spikes and goodluck!", canvasX / 2, ceilingY + 225);
        textSize(16);
        text("Press any button to continue", canvasX / 2, ceilingY + 275);
        
        // dont run the rest of the code if the player is in the tutorial
        return;
    }
    strokeWeight(1);

    // move spikes only run all the game code when player hasnt lost and isnt in tutorial
    for (var spike of spikeList) {
        spike.update();

        if (spike.hittingPlayer()) {
            playerLost = true;
        }
    }

    // move background image and floor image
    backgroundX -= backgroundImageSpeed;
    if (backgroundX <= -combinedBackground.width) {
        backgroundX = 0;
    }

    floorAndCeilingX1 -= floorImageSpeed;
    floorAndCeilingX2 -= floorImageSpeed
    if (floorAndCeilingX1 <= -floorCombinedBlock2.width) {
        floorAndCeilingX1 = floorAndCeilingX2 + floorCombinedBlock2.width;

        for (let i = 0; i < 5; i++) {
            // add a random chance to use other block image which is same size so that floor and ceiling are procedural
            if (random(1) > 0.5) {
                floorCombinedBlock.image(blockImage, blockImage.width * i, 0);
            }
            else {
                floorCombinedBlock.image(otherBlockImage, blockImage.width * i, 0);
            }
        }

        for (let i = 0; i < 5; i++) {
            // add a random chance to use other block image which is same size so that floor and ceiling are procedural
            if (random(1) > 0.5) {
                roofCombinedBlock.image(blockImage, blockImage.width * i, 0);
            }
            else {
                roofCombinedBlock.image(otherBlockImage, blockImage.width * i, 0);
            }
        }
    }
    if (floorAndCeilingX2 <= -floorCombinedBlock2.width) {
        floorAndCeilingX2 = floorAndCeilingX1 + floorCombinedBlock.width;

        for (let i = 0; i < 5; i++) {
            // add a random chance to use other block image which is same size so that floor and ceiling are procedural
            if (random(1) > 0.5) {
                floorCombinedBlock2.image(blockImage, blockImage.width * i, 0);
            }
            else {
                floorCombinedBlock2.image(otherBlockImage, blockImage.width * i, 0);
            }
        }

        for (let i = 0; i < 5; i++) {
            // add a random chance to use other block image which is same size so that floor and ceiling are procedural
            if (random(1) > 0.5) {
                roofCombinedBlock2.image(blockImage, blockImage.width * i, 0);
            }
            else {
                roofCombinedBlock2.image(otherBlockImage, blockImage.width * i, 0);
            }
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
        gravityForce += gravityAcceleration;

        /*
        if (gravityForce > terminalVelocity) {
            gravityForce = terminalVelocity;
        }*/
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
}

// called by the spike when its score gets set to 15
function speedUpAllSpikes() {
    for (var spike of spikeList) {
        spike.increaseSpeed(1);
    }

    backgroundImageSpeed += 1;
    floorImageSpeed += 1;
}

function keyPressed() {
    if (playerTutorial == true) {
        playerTutorial = false;
    }
    else if (playerLost == true) {
        ClosePage();
    }
    else if (keyCode == SpaceBarKeyCode && playerGrounded == true) {
        playerGrounded = false;
        playerJumping = true;
    }
    else if (keyCode == EscapeKeyCode) {
        ClosePage();
    }
}

function mousePressed() {
    if (playerLost == true) {
        ClosePage();
    }
    else if (playerTutorial == true) {
        playerTutorial = false;
    }
}