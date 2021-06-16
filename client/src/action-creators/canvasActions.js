
import {SET_CANVAS, PUSH_TO_UNDO, PUSH_TO_REDO,
    UNDO, REDO} from '../actions';


export const setCanvas = canvas => {
    return {
        type: SET_CANVAS,
        payload: canvas
    };
};

export const pushToUndo = data => {
    return {
        type: PUSH_TO_UNDO,
        payload: data
    };
};

export const pushToRedo = data => {
    return {
        type: PUSH_TO_REDO,
        payload: data
    };
};

export const undoAction = () => {
    return {
        type: UNDO
    };
};

export const redoAction = () => {
    return {
        type: REDO
    };
};