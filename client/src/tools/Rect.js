import Tool from "./Tool";

export default class Rect extends Tool{
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
        const currentX = this.getTouchCoords(ev).x;
        const currentY = this.getTouchCoords(ev).y;
        const width = currentX - this.startCoords.x;
        const height =  currentY - this.startCoords.y;
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'rect',
                x: this.startCoords.x,
                y: this.startCoords.y,
                width, height,
                strokeColor: this.ctx.strokeStyle,
                fillColor: this.ctx.fillStyle,
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
            const currentX = this.getTouchCoords(ev).x;
            const currentY = this.getTouchCoords(ev).y;
            const width = currentX - this.startCoords.x;
            const height =  currentY - this.startCoords.y;
            this.draw(this.startCoords.x, this.startCoords.y,
                width, height);
        }
    };

    draw(x, y, width, height){
        const img = new Image();
        img.src = this.screenshot;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.rect(x, y, width, height);
            this.ctx.fill();
            this.ctx.stroke();
        };
    }

    static staticDraw(ctx, x, y, width, height, strokeColor, fillColor, lineWidth){
        const oldStrokeStyle = ctx.strokeStyle;
        const oldFillStyle = ctx.fillStyle;
        const oldLineWidth = ctx.lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = oldStrokeStyle;
        ctx.fillStyle = oldFillStyle;
        ctx.lineWidth = oldLineWidth;
    }
}