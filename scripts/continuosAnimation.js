// this will have an update function to check game tick and play the animation frames
class continuosAnimation {
    constructor(spriteSheet, frames, timeBetweenFrames, scaleDivider, frameAdjuster) {
        this.spriteSheet = spriteSheet;
        this.frameCount = frames - 1; // because frames are zero indexed so subtract one from the total for it
        this.curFrame = 0;
        this.timeBetweenFrames = timeBetweenFrames; // how much time should pass inbetween frames in miliseconds
        this.nextAnimationTime = this.seconds() + timeBetweenFrames; // the time when we should increment to the next frame in the animation
        this.scaleDivider = scaleDivider; // some number that will scale the image based on passed in numbers (integers for down, decimals for up)
        this.frameAdjuster = frameAdjuster; // in case you sprite isnt lined up right this cut off how ever many pixels you need from the right of the sprite

        this.stopAnimation = false; // if we wanna stop updating the frames at a point for a certain amount of time
    }

    update(x, y) {
        if (this.seconds() >= this.nextAnimationTime && !this.stopAnimation) {
            this.nextAnimationTime = this.seconds() + this.timeBetweenFrames;

            if (this.curFrame < this.frameCount) {
                // this.curimage = animationFrames[curFrame]
                this.curFrame += 1;
            }
            else {

                this.curFrame = 0;
            }
        }

        // image(image, x, y, width, height, some_shit_that_makes_frames_work, 0, other shit that makes frames work, more shit for frames) (if not evident i dont understand this but it works)
        image(this.spriteSheet, x, y, this.spriteSheet.height/this.scaleDivider, this.spriteSheet.height/this.scaleDivider, this.spriteSheet.height*this.curFrame - this.frameAdjuster, 0, this.spriteSheet.height, this.spriteSheet.height);
    }

    seconds() {
        return millis() / 1000;
    }
}
