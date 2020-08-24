const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdH = parseFloat(birdStyles.height);
const birdW = parseFloat(birdStyles.width);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);
const gameDom = document.querySelector('.game');
const gameH = document.querySelector('.game').clientHeight;

class Bird extends Rectangle {
    constructor() {
        super(birdW, birdH, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1500;
        this.maxY = gameH - landH - this.height;
        this.swingStatus = 1;
        this.render();
    }

    move(duration) {
        super.move(duration);
        this.ySpeed += this.g * duration;
    }

    onMove() {
        if (this.top < 0) {
            this.top = 0;
        } else if (this.top > this.maxY) {
            this.top = this.maxY;
        }
    }

    jump() {
        this.ySpeed = -450;
    }

    startSwing() {
        this.timer = setInterval(() => {
            this.swingStatus++;
            if (this.swingStatus === 4) {
                this.swingStatus = 1;
            }
            this.render();
        }, 10)
    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }

    render() {
        super.render();
        this.dom.className = `bird swing${this.swingStatus}`;
    }
}
// var b = new Bird();
// setInterval(() => {
//     b.move(16 / 1000);
// }, 16);