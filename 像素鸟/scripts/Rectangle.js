class Rectangle {
    constructor(width, height, left, top, xSpeed, ySpeed, dom) {
        this.width = width;
        this.height = height;
        this.top = top;
        this.left = left;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
        this.render();
    }

    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }

    move(duration) {
        const disX = this.xSpeed * duration;
        const disY = this.ySpeed * duration;
        this.left = this.left + disX;
        this.top = this.top + disY;
        if (this.onMove) {
            this.onMove();
        }
        this.render();
    }


}