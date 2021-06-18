import Tool from "./Tool";

export default class Line extends Tool{
    constructor(canvas, socket, sessionId){
        super(canvas, socket, sessionId);
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
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'line',
                x: this.getTouchCoords(ev).x,
                y: this.getTouchCoords(ev).y,
                startCoords: this.startCoords,
                strokeColor: this.ctx.strokeStyle,
                lineWidth: this.ctx.lineWidth
            }
        }));
        this.socket.send(JSON.stringify({
            method: 'stop'
        }));
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
            this.draw(this.getTouchCoords(ev).x, this.getTouchCoords(ev).y);
        }
    };

    draw(x, y){
        const img = new Image();
        img.src = this.screenshot;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.moveTo(this.startCoords.x, this.startCoords.y)
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        };
    }

    static staticDraw(ctx, x, y, startCoords, strokeColor, lineWidth){
        const oldStrokeStyle = ctx.strokeStyle;
        const oldLineWidth = ctx.lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(startCoords.x, startCoords.y)
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = oldStrokeStyle;
        ctx.lineWidth = oldLineWidth;
    }
}