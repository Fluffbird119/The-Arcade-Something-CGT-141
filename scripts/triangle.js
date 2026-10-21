class triangle {
    constructor(x, y, w, h, s) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.speed = s;

        this.color = "grey";
        this.strokeColor = "black";
    }

    // functions that you call inside the class you have to define before you call them
    repositionResizeTriangle() {
        this.x = GetCanvasX();

        // these will become values in some predefined range later on
        this.width = 10;
        this.height = 50;
    }

    // function to call in main update loop to see if triangle is off bounds of the screen and then move and resize if so
    checkTrianglePosition() {
        // if triangle is offscreen to the left
        if (this.x + this.width < GetCanvasX()) {
            repositionResizeTriangle();
        }
    }

    moveTriangle() {
        this.x -= this.speed;
    }

    // will be called from main js file still needs to be made to check if player is touching spike and if so they should be killed
    checkTriangleIntersection() {

    }

    // works the same as update in your game files p5.js will call this every frame for each triangle instantiated
    update()
    {
        fill(this.c);
        stroke(this.strokeC);
        makeTriangle(this.x, this.y, this.h, this.w);
    
        moveTriangle();
        checkTrianglePosition()
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
