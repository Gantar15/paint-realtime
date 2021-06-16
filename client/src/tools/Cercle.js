import Tool from "./Tool";

export default class Cercle extends Tool{
    constructor(canvas){
        super(canvas);
        this.listen();
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    getTouchCoords(ev){
        return {
            x: ev.pageX - ev.target.offsetLeft, 
            y: ev.pageY - ev.target.offsetTop
        };
    }
    mouseUpHandler = ev => {
        this.mouseDown = false;
    };
    mouseDownHandler = ev => {
        this.screenshot = this.canvas.toDataURL();
        this.mouseDown = true;
        this.ctx.beginPath();
        this.startCoords = {
            x: this.getTouchCoords(ev).x,
            y: this.getTouchCoords(ev).y
        };
        this.ctx.moveTo(this.startCoords.x, this.startCoords.x);
    };
    mouseMoveHandler = ev => {
        if(this.mouseDown){
            const currentX = this.getTouchCoords(ev).x;
            const width = currentX - this.startCoords.x;
            this.draw(this.startCoords.x, this.startCoords.y,
                Math.abs(width));
        }
    };

    draw(x, y, radius){
        const img = new Image();
        img.src = this.screenshot;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.arc(x, y, radius, 0, 2*Math.PI);
            this.ctx.stroke();
        };
    }
}