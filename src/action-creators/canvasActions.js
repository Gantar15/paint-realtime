
import {SET_CANVAS} from '../actions';


export const setCanvas = canvas => {
    return {
        type: SET_CANVAS,
        payload: canvas
    };
}