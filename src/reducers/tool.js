
import {SET_TOOL} from '../actions';


export default function updateTool(tool, action){
    switch(action.type){
        case SET_TOOL: 
            return action.payload;
        default: 
            return tool;
    }
}