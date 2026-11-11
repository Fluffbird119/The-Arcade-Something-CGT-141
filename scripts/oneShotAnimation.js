// just plays an anaimationa at a speed only needs to be called once
class oneShotAnimation {
    constructor(animationFrames, timeBetweenFrames) {
        this.frames = animationFrames; // the frames
        this.frameCount = animationFrames.length; // amount of frames because we want them to stop before
        this.curFrame = 0;
        this.timeBetweenFrames = timeBetweenFrames; // how much time should pass inbetween frames in miliseconds
        this.nextAnimationTime = this.seconds() + timeBetweenFrames; // the time when we should increment to the next frame in the animation
    }

    update() {
        if (this.seconds >= this.nextAnimationTime) {
            console.log("increment frame");
            this.nextAnimationTime = this.seconds()
        }
    }

    seconds() {
        return millis() / 1000
    }
}