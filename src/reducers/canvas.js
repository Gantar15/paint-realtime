
import {SET_CANVAS} from '../actions';


export default function updateCanvas(canvas, action){
    switch(action.type){
        case SET_CANVAS: 
            return action.payload;
        default: 
            return canvas;
    }
}