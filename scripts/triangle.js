class Triangle {
    constructor(x, y, w, h, s) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speed = s;

        this.color = color(random(255),random(255),random(255));
        this.strokeColor = color(0, 0, 0);
    }

    // functions that you call inside the class you have to define before you call them
    repositionResizeTriangle() {
        this.color = color(random(255),random(255),random(255));
        this.x = GetCanvasX();
        this.y = floorY;

        // these will become values in some predefined range later on

        // randomize the spikes height and width slightly
        this.width = random(40, 80);
        this.height = random(100, 130);

        // put spike on celing around 25% of the time
        if (random(1) > 0.75) {
            this.y = ceilingY;
            this.height = random(-140, -160);
        }
    }

    // function to call in main update loop to see if triangle is off bounds of the screen and then move and resize if so
    checkTrianglePosition() {
        // if triangle is offscreen to the left
        if (this.x + this.width < -spikeOffset) {
            this.repositionResizeTriangle();
        }
    }

    moveTriangle() {
        this.x -= this.speed;
    }

    // will be called from main js file still needs to be made to check if player is touching spike and if so they should be killed
    hittingPlayer() {
        let shrinkAmount = 0.5; // how much smaller the hitbox should be comapred to the spike size

        let hbX = this.x + (this.width - (this.width * shrinkAmount)) / 2;
        let hbY = this.y - (this.height * shrinkAmount);
        let hbWidth = this.width * shrinkAmount;
        let hbHeight = this.height * shrinkAmount;

        // do box collison detection

        if (playerX + playerWidth > hbX && playerX < hbX + hbWidth && playerY + playerHeight > hbY && playerY < hbY + hbHeight) {
            return true;
        }
        else {
            return false;
        }
    }

    // works the same as update in your game files p5.js will call this every frame for each triangle instantiated
    update()
    {
        fill(this.color);
        stroke(this.strokeColor);

        this.moveTriangle();
        this.checkTrianglePosition();

        makeTriangle(this.x, this.y, this.width, this.height);
    }

    // random getters and setters if i need them blah blah blah good object oriented programming stuff
    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getSpeed() {
        return this.speed;
    }

    setX(newX) {
        this.x = newX;
    }

    setY(newY) {
        this.y = newY;
    }

    setwkdth(newWidth) {
        this.width = newWidth;
    }

    setHeight(newHeight) {
        this.height = newHeight;
    }

    setSpeed(newSpeed) {
        this.speed = newSpeed;
    }

    setColor(newColor) {
        this.color = newColor;
    }

    setStrokeColor(newSC) {
        this.strokeColor = newSC;
    }
}
