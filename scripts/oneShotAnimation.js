// just plays an anaimationa at a speed only needs to be called once
class oneShotAnimation {
    constructor(spriteSheet, timeBetweenFrames) {
        this.spriteSheet = spriteSheet;
        this.curFrame = 0;
        this.timeBetweenFrames = timeBetweenFrames; // how much time should pass inbetween frames in miliseconds
        this.nextAnimationTime = this.seconds() + timeBetweenFrames; // the time when we should increment to the next frame in the animation
        this.animationFinished = false;
    }

    update() {
        if (this.seconds() >= this.nextAnimationTime) {
            this.nextAnimationTime = this.seconds() + this.timeBetweenFrames;

            if (this.curFrame < this.frameCount) {
                // this.curimage = animationFrames[curFrame]
                this.curFrame += 1;
            }
            else {
                console.log("end animation");

                this.animationFinished = true;
            }
        }
    }

    // reset animation so it can play again
    reset() {
        this.animationFinished = false;
        this.curFrame = 0;
    }

    seconds() {
        return millis() / 1000;
    }


    // geter and seter garbage
    getFinished() {
        return this.animationFinished;
    }
}