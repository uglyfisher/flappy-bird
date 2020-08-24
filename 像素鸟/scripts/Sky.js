const skyDom = document.querySelector('.sky');
const skyStyles = getComputedStyle(skyDom);
const skyH = parseFloat(skyStyles.height);
const skyW = parseFloat(skyStyles.width);
const skyLeft = parseFloat(skyStyles.left);
const skyTop = parseFloat(skyStyles.top);
class Sky extends Rectangle {
    constructor() {
        super(skyW, skyH, skyLeft, skyTop, -50, 0, skyDom);
    }

    onMove() {
        if (this.left <= -skyW / 2) {
            this.left = 0;
        }
    }
}

// var s = new Sky();
// setInterval(() => {
//     s.move(16 / 1000);
// }, 16);