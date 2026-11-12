// this will have an update function to check game tick and play the animation frames
class continuosAnimation {
    constructor(animationFrames, timeBetweenFrames) {
        this.frames = animationFrames; // the frames
        this.frameCount = animationFrames.length; // amount of frames because we want them to stop before
        this.curFrame = 0;
        this.timeBetweenFrames = timeBetweenFrames; // how much time should pass inbetween frames in miliseconds
        this.nextAnimationTime = this.seconds() + timeBetweenFrames; // the time when we should increment to the next frame in the animation
        this.stopAnimation = false; // if we wanna stop updating the frames at a point for a certain amount of time
    }

    update() {
        if (this.seconds() >= this.nextAnimationTime) {
            this.nextAnimationTime = this.seconds() + this.timeBetweenFrames;
            console.log("increment frame");

            if (this.curFrame < this.frameCount) {
                // this.curimage = animationFrames[curFrame]
                this.curFrame += 1;
            }
            else {
                console.log("reset animation");

                this.curFrame = 0;
            }
        }
    }

    seconds() {
        return millis() / 1000;
    }
}
