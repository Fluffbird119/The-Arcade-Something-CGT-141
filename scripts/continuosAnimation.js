// this will have an update function to check game tick and play the animation frames
class continuosAnimation {
    constructor(animationFrames, timeBetweenFrames) {
        this.frames = animationFrames; // the frames
        this.frameCount = animationFrames.length; // amount of frames because we want them to stop before
        this.timeBetweenFrames = timeBetweenFrames; // how much time should pass inbetween frames
    }
}