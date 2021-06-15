
import {SET_TOOL} from '../actions';


export default function updateCanvas(canvas, action){
    switch(action.type){
        case SET_TOOL: {

        }
        default: 
            return canvas;
    }
}