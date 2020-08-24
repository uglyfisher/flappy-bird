const landDom = document.querySelector('.land');
const landStyles = getComputedStyle(landDom);
const landH = parseFloat(landStyles.height);
const landW = parseFloat(landStyles.width);
const landLeft = parseFloat(landStyles.left);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landW, landH, landLeft, landTop, speed, 0, landDom);
    }

    onMove() {
        if (this.left <= -landW / 2) {
            this.left = 0;
        }
    }
}

// var l = new Land(-100);
// setInterval(() => {
//     l.move(16 / 1000);
// }, 16);