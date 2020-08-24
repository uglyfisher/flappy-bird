const gameW = gameDom.clientWidth;

class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameW, top, speed, 0, dom);
    }

    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

function getRandom(Min, Max) {
    return Math.floor(Math.random() * (Max - Min) + Min);
}

class pipePare {
    constructor(speed) {
        this.spaceHeight = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.spaceHeight;
        const upHeight = getRandom(this.minHeight, this.maxHeight);
        const upDom = document.createElement('div');
        upDom.className = "pipe up";
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);

        const downHeight = landTop - upHeight - this.spaceHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement('div');
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    useless() {
        return this.upPipe.left < -this.upPipe.width;
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}


class pipePareProducer {
    constructor(speed) {
        this.speed = speed;
        this.timer = null;
        this.tick = 1500;
        this.pairs = [];
    }

    startProducer() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.pairs.push(new pipePare(this.speed));
            for (let i = 0; i < this.pairs.length; i++) {
                var pair = this.pairs[i];
                if (pair.useless()) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick)
    }

    stopProducer() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
// let producer = new pipePareProducer(-100);
// producer.startProducer();
// setInterval(() => {
//     producer.pairs.forEach(pair => {
//         pair.move(16 / 1000);
//     });
// }, 16);