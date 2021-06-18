import Tool from "./Tool";

export default class Brush extends Tool{
    constructor(canvas, socket, sessionId){
        super(canvas, socket, sessionId);
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
        this.socket.send(JSON.stringify({
            method: 'stop'
        }));
    };
    mouseDownHandler = ev => {
        this.mouseDown = true;
        this.ctx.beginPath();
        this.ctx.moveTo(this.getCoords(ev).x, this.getCoords(ev).y);
    };
    mouseMoveHandler = ev => {
        if(this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    type: 'brush',
                    x: this.getCoords(ev).x,
                    y: this.getCoords(ev).y,
                    strokeColor: this.ctx.strokeStyle, 
                    lineWidth: this.ctx.lineWidth
                }
            }));
        }
    };

    static draw(ctx, x, y, strokeColor, lineWidth){
        const oldStrokeStyle = ctx.strokeStyle;
        const oldLineWidth = ctx.lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.strokeStyle = oldStrokeStyle;
        ctx.lineWidth = oldLineWidth;
    }
}