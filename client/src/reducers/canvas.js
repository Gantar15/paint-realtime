
import {SET_CANVAS, PUSH_TO_UNDO, PUSH_TO_REDO,
    UNDO, REDO} from '../actions';
import {saveScreen} from '../utils/index';
import {maxActionsStackSize} from '../utils/index';


function pushToUndo(canvas, action){
    const undoList = [...canvas.undoList];

    if(undoList.length < maxActionsStackSize){
        undoList.push(action.payload);
    }

    return {
        ...canvas,
        undoList
    };
}

function pushToRedo(canvas, action){
    const redoList = [...canvas.redoList];

    if(redoList.length < maxActionsStackSize){
        redoList.push(action.payload);
    }

    return {
        ...canvas,
        redoList
    };
}

function undo(canvas, sessionId){
    let dataUrl;
    let undoList = [...canvas.undoList];
    if(canvas.undoList.length){
        const ctx = canvas.canvas.getContext('2d');
        dataUrl = undoList.pop();
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const {width, height} = canvas.canvas;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            saveScreen(canvas.canvas, sessionId);
        };
    } else{
        console.info('Undo stack has already clean ^-^');
    }

    if(dataUrl){
        return pushToRedo({
            ...canvas,
            undoList
        }, {payload: canvas.canvas.toDataURL()});
    }
    return canvas;
}

function redo(canvas, sessionId){
    let dataUrl;
    let redoList = [...canvas.redoList];
    if(canvas.redoList.length){
        const ctx = canvas.canvas.getContext('2d');
        dataUrl = redoList.pop();
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            const {width, height} = canvas.canvas;
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            saveScreen(canvas.canvas, sessionId);
        };
    } else{
        console.info('Redo stack has already clean 0_0');
    }

    if(dataUrl){
        return pushToUndo({
            ...canvas,
            redoList
        }, {payload: canvas.canvas.toDataURL()});
    }
    return canvas;
}

export default function updateCanvas(canvas, action, sessionId){
    switch(action.type){
        case SET_CANVAS: 
            return {
                ...canvas,
                canvas: action.payload
            };
        case PUSH_TO_UNDO: 
            return pushToUndo(canvas, action);
        case PUSH_TO_REDO: 
            return pushToRedo(canvas, action);
        case UNDO: 
            return undo(canvas, sessionId);
        case REDO: 
            return redo(canvas, sessionId);
        default: 
            return canvas;
    }
}