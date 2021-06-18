import Brush from "./Brush";

export default class Eraser extends Brush{
    constructor(canvas, socket, sessionId){
        super(canvas, socket, sessionId);
        this.canvas.onmousemove = this.mouseMoveHandler;
    }

    mouseMoveHandler = ev => {
        if(this.mouseDown){
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    type: 'eraser',
                    x: this.getCoords(ev).x,
                    y: this.getCoords(ev).y,
                    lineWidth: this.ctx.lineWidth
                }
            }));
        }
    };

    static staticDraw(ctx, x, y, lineWidth) {
        const oldStrokeStyle = ctx.strokeStyle;
        const oldLineWidth = ctx.lineWidth;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = "white";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.lineWidth = oldLineWidth;
        ctx.strokeStyle = oldStrokeStyle;
    }
}