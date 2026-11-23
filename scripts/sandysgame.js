var canvasX = 1280;
var canvasY = 720;

var topBarHeight = 72;
var waterY = 210;
var zoneHeight = (canvasY - waterY) / 4;

var rodTipX = canvasX / 2;
var rodTipY = 86;

var hookAngle = 0;
var hookSwingSpeed = 1.2;
var hookSwingLimit = 1.2;
var hookSwingDirection = 1;
var hookMinLength = 80;
var hookLength = hookMinLength;
var hookDropSpeed = 400;
var hookReelSpeed = 300;
var hookState = "swinging";
var hookX = 0;
var hookY = 0;
var caughtItem = null;

var levels = [
    { quota: 500, time: 60 },
    { quota: 1000, time: 60 },
    { quota: 1750, time: 75 },
    { quota: 2750, time: 75 },
    { quota: 4000, time: 90 }
];

var level = 1;
var quota = 500;
var timeLeft = 60;
var gameState = "menu";

var money = 0;
var levelStartMoney = 0;
var items = [];

var itemTiers = [
    { kind: "fish", tier: "Tiny", value: 10, size: 16, zone: 0, count: 4, color: [255, 200, 90], names: ["Minnow", "Guppy", "Anchovy"] },
    { kind: "fish", tier: "Small", value: 25, size: 20, zone: 0, count: 3, color: [255, 140, 60], names: ["Sardine", "Bluegill", "Clownfish"] },
    { kind: "fish", tier: "Medium", value: 60, size: 26, zone: 1, count: 3, color: [120, 200, 120], names: ["Perch", "Trout", "Bass"] },
    { kind: "fish", tier: "Large", value: 120, size: 32, zone: 2, count: 2, color: [220, 110, 140], names: ["Salmon", "Carp", "Catfish"] },
    { kind: "fish", tier: "Huge", value: 200, size: 38, zone: 2, count: 1, color: [150, 170, 230], names: ["Tuna", "Sturgeon", "Swordfish"] },
    { kind: "fish", tier: "Giant", value: 350, size: 44, zone: 3, count: 1, color: [170, 120, 220], names: ["Marlin", "Giant grouper", "Shark"] },
    { kind: "fish", tier: "Legendary", value: 600, size: 36, zone: 3, count: 1, color: [255, 215, 0], names: ["Golden koi", "Megalodon"] },
    { kind: "trash", tier: "Small", value: 5, size: 12, zone: 0, count: 2, color: [160, 160, 160], names: ["Crushed soda can", "Plastic bag"] },
    { kind: "trash", tier: "Medium", value: 15, size: 16, zone: 1, count: 2, color: [130, 110, 90], names: ["Old boot", "Empty bottle"] },
    { kind: "trash", tier: "Large", value: 30, size: 22, zone: 2, count: 2, color: [90, 90, 90], names: ["Tire", "Traffic cone"] },
    { kind: "trash", tier: "Huge", value: 50, size: 34, zone: 3, count: 1, color: [110, 120, 110], names: ["Bicycle", "Shopping cart", "Toilet", "Sunken refrigerator"] }
];

// p5 calls this once at startup. Creates the fishing canvas inside game-window and requests the images, and spawns fish and trash so the water is populated behind the menu.
function setup() {
    createCanvas(canvasX, canvasY).parent("game-window");
    loadSprites();
    spawnItems();
}

// Runs each frame. Converts elapsed milliseconds to seconds for the timer and hook movement during play. Draws the scene and interface on every screen, including the menu and level results.
function draw() {
    var dt = deltaTime / 1000;

    if (gameState == "playing") {
        updateTimer(dt);
        updateHook(dt);
    }

    drawBackground();
    for (var i = 0; i < items.length; i++) {
        drawItem(items[i]);
    }
    drawBoat();
    drawHook();
    drawTopBar();
    drawOverlay();
}

// Enter uses the screen button; Escape goes back; thus, space drops the hook while it is swinging during the play.
function keyPressed() {
    if (keyCode == EscapeKeyCode) {
        ClosePage();
    }
    if (keyCode == SpaceBarKeyCode && gameState == "playing" && hookState == "swinging") {
        hookState = "dropping";
    }
    if (keyCode == ENTER) {
        pressButton();
    }
}

// pressButton decides what happens next. Uses the screen button when the click is inside its bounds.
function mousePressed() {
    if (mouseX > buttonX && mouseX < buttonX + buttonW && mouseY > buttonY && mouseY < buttonY + buttonH) {
        pressButton();
    }
}

// Runs the action for the current screen: start a game, retry a level, or continue after a win.
function pressButton() {
    if (gameState == "menu") {
        startGame();
    }
    else if (gameState == "levelWon" || gameState == "gameOver") {
        continueGame();
    }
}

// Starts a fresh run at level 1 with no money, then sets up that level.
function startGame() {
    level = 1;
    money = 0;
    startLevel();
}

var buttonW = 220;
var buttonH = 60;
var buttonX = canvasX / 2 - buttonW / 2;
var buttonY = canvasY / 2 + 60;

// Moves to the next level after a win, or returns to the menu after the final level. Retrying a lost level restores the money you had when that level began.
function continueGame() {
    if (gameState == "levelWon" && level < levels.length) {
        level = level + 1;
    }
    else if (gameState == "levelWon"){
        gameState = "menu";
        return;
    }
    else if (gameState=="gameOver") {
        money = levelStartMoney;
    }

    startLevel();
}

// Ends the level when the timer reaches zero; thus, subtracts the time since the last frame, in seconds.
function updateTimer(dt) {
    timeLeft -= dt;
    if (timeLeft <= 0) {
        timeLeft = 0;
        endLevel();
    }
}

// Loads this level's target and timer, saves the starting money, and creates a new set of items. Resets the hook and switches the game into play.
function startLevel() {
    var settings = levels[level - 1];
    quota = settings.quota;
    timeLeft = settings.time;
    levelStartMoney = money;
    items = [];
    spawnItems();
    hookState = "swinging";
    hookLength = hookMinLength;
    caughtItem = null;
    gameState = "playing";
    hookAngle = 0;

}

// Chooses the win or game-over screen by checking total money with the level's target.
function endLevel() {
    if (money >= quota) {
        gameState = "levelWon";
    }
    else{
        gameState = "gameOver";
    }
}

// Changes the hook's swing, drop, or return using dt in seconds, then works out its screen position. A caught item follows the hook and gets paid out when the line is fully reeled in.
function updateHook(dt) {
    if (hookState == "swinging") {
        swingHook(dt);
    }
    else if (hookState == "dropping") {
        hookLength += hookDropSpeed * dt;
        checkForCatch();
        if (hookState == "dropping" && shouldTurnAround()) {
            hookState = "reeling";
        }
    }
    else if (hookState == "reeling") {
        hookLength -= getReelSpeed(caughtItem) * dt;
        if (hookLength <= hookMinLength) {
            hookLength = hookMinLength;
            hookState = "swinging";
            if (caughtItem != null) {
                deliverItem(caughtItem);
                caughtItem = null;
            }
        }
    }

    var pos = getHookPosition(rodTipX, rodTipY, hookAngle, hookLength);
    hookX = pos.x;
    hookY = pos.y;

    if (caughtItem != null) {
        caughtItem.x = hookX;
        caughtItem.y = hookY + caughtItem.size;
    }
}

// Returns the reeling speed in pixels per second. More valuable catches slow it down, with a minimum of 50.
function getReelSpeed(item) {
    if (item == null) {
        return hookReelSpeed;
    }
    var speed = hookReelSpeed / (1+ item.value / 100);
    return max(speed, 50);
}

// Converts the line's angle and length into an x/y position. An angle of zero points straight down.
function getHookPosition(tipX, tipY, angle, length) {
    return { x: tipX + (length * Math.sin(angle)) , y: tipY + (length * Math.cos(angle)) };
}

// Moves the hook sideways using dt in seconds and reverses direction at either swing limit.
function swingHook(dt) {
    hookAngle += dt * hookSwingSpeed * hookSwingDirection ;

    if (hookAngle > hookSwingLimit || hookAngle < -hookSwingLimit) {
        hookAngle = constrain(hookAngle, -hookSwingLimit, hookSwingLimit);
        hookSwingDirection = -hookSwingDirection;
    }
}

// Checks whether the hook is below the canvas or past either side, so an empty cast can reel back in.
function shouldTurnAround() {
    return hookY > canvasY || hookX < 0 || hookX > canvasX;
}

// Builds one fish or piece of trash from a tier's settings and picks a name and position in its depth zone. Trash also gets a small random tilt.
function makeItem(tier) {
    var zoneTop = waterY + zoneHeight*tier.zone;
    var zoneBottom = zoneTop + zoneHeight;
    var angle = 0;
    if (tier.kind == "trash") {
        angle = random(-PI / 12, PI / 12);
    }
    return {
        kind: tier.kind,
        value: tier.value,
        size: tier.size,
        color: tier.color,
        name: random(tier.names),
        x: random(0, canvasX),
        y: random(zoneTop, zoneBottom),
        angle: angle
    };
}

// Creates each tier's requested number of items. Tries up to 30 new positions when an item overlaps another. Then moves some trash into the path of useful fish.
function spawnItems() {
    for (var i = 0; i < itemTiers.length; i++) {
        var tier = itemTiers[i];
        for (var j = 0; j < tier.count; j++) {

            var item = makeItem(tier);
            for (var tries = 0; tries < 30 && overlapsAny(item); tries++) {
                item = makeItem(tier);
            }
            items.push(item);
        }
    }
    placeBlockers();
}

var blockerCount = 2;

// Keeps a piece of trash in its old position if the new spot crowds another item. Tries to put up to blockerCount pieces of trash between the rod tip and different helpful fish.
function placeBlockers() {
    var trash = items.filter(function (it) { return it.kind == "trash"; });
    var bigFish = items.filter(function (it) { return it.kind == "fish" && it.value >= 120; });

    for (var i = 0; i < blockerCount && i < bigFish.length && i < trash.length; i++) {
        var fish = random(bigFish);
        bigFish.splice(bigFish.indexOf(fish), 1);
        var blocker = trash[i];

        var oldX = blocker.x;
        var oldY = blocker.y;
        var spot = blockerSpot(fish, blocker);
        blocker.x = spot.x;
        blocker.y = spot.y;

        var clash = items.some(function (it) {
            return it != blocker && dist(blocker.x, blocker.y, it.x, it.y) < blocker.size + it.size + spawnGap;
        });
        if (clash) {
            blocker.x = oldX;
            blocker.y = oldY;
        }
    }
}

// Returns a spot 60% of the way from the rod tip to the fish. The trash parameter is currently unused.
function blockerSpot(fish, trash) {
    var t = 0.6;
    return { x: lerp(rodTipX, fish.x, t), y: lerp(rodTipY, fish.y, t) };
}

var spawnGap = 10;

// Checks whether an item is too close to anything already created, including the extra spawnGap spacing.
function overlapsAny(item) {

    for (var i = 0; i < items.length; i++) {
        var d = dist(item.x, item.y, items[i].x, items[i].y);
        if (d < item.size + items[i].size + spawnGap) {
            return true;
        };
    }
    return false;
}

// Checks whether the hook is close enough to catch this item, and includes a little extra reach to make catches easier.
function hookTouches(item) {
    var hookRadius = 18;
    var catchBonus = 8;
    var d = dist(hookX, hookY, item.x, item.y);
    return d < hookRadius + item.size + catchBonus  ;
}

// Catches the first item touching the hook and starts reeling it in.
function checkForCatch() {
    for (var i = 0; i < items.length; i++) {
        if (hookTouches(items[i])) {
            caughtItem = items[i];
            hookState = "reeling";
            return;

        }
    }
}

// Adds the catch's value to the money total and removes it from the water.
function deliverItem(item) {
    money += item.value;
    var spot = items.indexOf(item);
    items.splice(spot, 1);
}

var sprites = {};

var fishShapes = { "Swordfish": "swordfish-base", "Marlin": "swordfish-base", "Shark": "shark-base", "Megalodon": "shark-base" };

// Returns a tinted copy of a fish image. Leaves transparent pixels and dark details, like outlines, alone.
function colorFish(img, color) {
    var copy = img.get();
    copy.loadPixels();
    for (var i = 0; i < copy.pixels.length; i += 4) {
        var r = copy.pixels[i];
        var g = copy.pixels[i+1];
        var b = copy.pixels[i+2];
        var a = copy.pixels[i+3];
        if (a == 0) {
            continue;
        }
        if (r + g + b <150) {
            continue;
        }

        {
            copy.pixels[i] = color[0] * r / 255;
            copy.pixels[i+1] = color[1] * g / 255;
            copy.pixels[i+2] = color[2] * b / 255;
        }

    }
    copy.updatePixels();
    return copy;
}

// Turns an item name into a lowercase, hyphenated PNG filename and loads it into the sprites. Loading finishes later; missing images are ignored so the drawing functions can use their fallback shapes.
function loadSprite(name) {
    var fileName = name.toLowerCase().replace(/ /g, "-") + ".png";
    loadImage("../sandy-images/" + fileName, function (img) { sprites[name] = img; }, function () {});
}

// Requests the scenery, hook, base fish images, and every named fish and trash image.
function loadSprites() {
    loadSprite("background");
    loadSprite("boat");
    loadSprite("hook");
    loadSprite("fish-base");
    loadSprite("swordfish-base");
    loadSprite("shark-base");
    for (var i = 0; i < itemTiers.length; i++) {
        for (var j = 0; j < itemTiers[i].names.length; j++) {
            loadSprite(itemTiers[i].names[j]);
        }
    }
}

// Draws an image centered at x/y with width w and its original proportions. angle is in radians. Returns false if the image is unavailable, so the caller can draw a fallback.
function drawSprite(img, x, y, w, angle) {
    if (!img) {
        return false;
    }
    var h = w * img.height / img.width;
    push();
    translate(x, y);
    rotate(angle || 0);
    image(img, -w / 2, -h / 2, w, h);
    pop();
    return true;
}

// Adds the four depth labels. Draws the background image, or colored water bands if it has not loaded.
function drawBackground() {
    if (sprites.background) {
        image(sprites.background, 0, 0, canvasX, canvasY);
    }
    else {
        background(150, 215, 245);
        var zoneColors = [[45, 160, 215], [30, 120, 190], [20, 85, 155], [12, 50, 105]];
        noStroke();
        for (var i = 0; i < 4; i++) {
            fill(zoneColors[i]);
            rect(0, waterY + zoneHeight * i, canvasX, zoneHeight);
        }
    }

    var zoneNames = ["SHALLOWS", "MIDWATER", "DEEP", "ABYSS"];
    noStroke();
    fill(255, 255, 255, 140);
    textSize(14);
    textStyle(BOLD);
    textAlign(RIGHT, TOP);
    for (var j = 0; j < 4; j++) {
        text(zoneNames[j], canvasX - 15, waterY + zoneHeight * j + 10);
    }
}

// Draws one fish or piece of trash. Fish keep a tinted base image so it doesn't need tinting every frame, so uses a colored circle while an image is unavailable.
function drawItem(item) {

    var img = sprites[item.name];
    if (item.kind == "fish") {
        var base = sprites[fishShapes[item.name] || "fish-base"];
        if (!item.sprite && base) {
            item.sprite = colorFish(base, item.color);
        }
        img = item.sprite;
    }

    if (!drawSprite(img, item.x, item.y, item.size * 2, item.angle)) {
        stroke(30);
        strokeWeight(2);
        fill(item.color);
        circle(item.x, item.y, item.size * 2);
    }
}

// If the image is unavailable, uses a simple boat and stick figure, so draws the boat image beside the rod tip.
function drawBoat() {

    if (drawSprite(sprites.boat, rodTipX - 102, rodTipY + 63, 260)) {
        return;
    }

    var deckY = waterY - 20;
    var manX = rodTipX - 110;
    stroke(30);
    strokeWeight(4);
    fill(255);
    quad(rodTipX - 210, deckY, rodTipX, deckY, rodTipX - 30, waterY + 15, rodTipX - 180, waterY + 15);
    line(manX, deckY, manX, deckY - 38);
    circle(manX, deckY - 50, 24);
    line(manX, deckY - 25, manX + 30, deckY - 20);
    line(manX + 30, deckY - 20, rodTipX, rodTipY);
}

// Draws the fishing line and hook. If the hook image is unavailable, uses a small arc.
function drawHook() {
    stroke(30);
    strokeWeight(2);
    line(rodTipX, rodTipY, hookX, hookY);

    if (!drawSprite(sprites.hook, hookX, hookY + 23, 30)) {
        noFill();
        strokeWeight(3);
        arc(hookX, hookY + 8, 16, 16, 0, PI);
    }
}

// Shows the money total, target, level, and seconds remaining across the top of the screen.
function drawTopBar() {
    noStroke();
    fill(250, 215, 110);
    rect(0, 0, canvasX, topBarHeight);

    textSize(20);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    fill(70, 50, 20);
    text("Money", 30, 20);
    text("Target", 30, 44);
    text("Level", canvasX - 150, 20);
    text("Time", canvasX - 150, 44);

    fill(40, 150, 40);
    text("$" + money, 120, 20);
    fill(220, 90, 40);
    text("$" + quota, 120, 44);
    text(level, canvasX - 70, 20);
    text(ceil(timeLeft), canvasX - 70, 44);
}

// Dims the game and draws the menu or level result with its button. Does nothing during play.
function drawOverlay() {
    if (gameState == "playing") {
        return;
    }

    var title = "Game Over";
    var subtitle = "Money: $" + money + "    Target: $" + quota;
    var label = "Play Again";
    if (gameState == "levelWon") {
        title = level == levels.length ? "You Win!" : "Level " + level + " cleared!";
        if (level < levels.length) {
            label = "Next Level";
        }
        else {
            label = "Return to Menu";
        }
    }
    else if (gameState == "menu") {
        title = "FISHING GAME";
        subtitle = "Hit the money quota on all " + levels.length + " levels";
        label = "Play";
    }

    noStroke();
    fill(0, 0, 0, 150);
    rect(0, 0, canvasX, canvasY);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(56);
    text(title, canvasX / 2, canvasY / 2 - 40);
    textSize(24);
    text(subtitle, canvasX / 2, canvasY / 2 + 20);

    stroke(190, 130, 40);
    strokeWeight(4);
    fill(255, 225, 120);
    rect(buttonX, buttonY, buttonW, buttonH, 12);
    noStroke();
    fill(110, 70, 20);
    textSize(26);
    textStyle(BOLD);
    text(label, canvasX / 2, buttonY + buttonH / 2);
}