import Tool from "./Tool";

export default class Brush extends Tool{
    constructor(canvas){
        super(canvas);
        this.listen();
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler;
        this.canvas.onmousemove = this.mouseMoveHandler;
        this.canvas.onmouseup = this.mouseUpHandler;
    }

    getCoords(ev){
        return {
            x: ev.pageX - ev.target.offsetLeft, 
            y: ev.pageY - ev.target.offsetTop
        };
    }
    mouseUpHandler = ev => {
        this.mouseDown = false;
    };
    mouseDownHandler = ev => {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(this.getCoords(ev).x, this.getCoords(ev).y);
    };
    mouseMoveHandler = ev => {
        if(this.mouseDown){
            this.draw(this.getCoords(ev).x, this.getCoords(ev).y);
        }
    };

    draw(x, y){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }
}