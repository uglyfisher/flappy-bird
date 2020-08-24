class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipe = new pipePareProducer(-100);
        this.timer = null;
        this.tick = 16;
        this.gameOver = false;
    }

    start() {
        if (this.timer) {
            return;
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.pipe.startProducer();
        this.bird.startSwing();
        this.timer = setInterval(() => {
            this.sky.move(this.tick / 1000);
            this.land.move(this.tick / 1000);
            this.bird.move(this.tick / 1000);
            this.pipe.pairs.forEach(pair => {
                pair.move(this.tick / 1000);
            });
            if (this.isgameOver()) {
                this.gameOver = true;
                this.stop();
            }
        }, this.tick);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.pipe.stopProducer();
        this.bird.stopSwing();
    }

    isHit(rec1, rec2) {
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2);
        var disY = Math.abs(centerY1 - centerY2);
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }

    isgameOver() {
        if (this.bird.top === this.bird.maxY) {
            return true;
        }
        for (let i = 0; i < this.pipe.pairs.length; i++) {
            const pair = this.pipe.pairs[i];
            if (this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
                return true;
            }
        }
        return false;
    }

    regEvent() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop();
                }
                else {
                    this.start();
                }
            }
            else if (e.key === " ") {
                this.bird.jump();
            }
        }
    }
}

let gm = new Game();
gm.regEvent();