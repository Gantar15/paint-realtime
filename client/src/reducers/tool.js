
import {SET_TOOL, SET_FILL_COLOR, 
    SET_STROKE_COLOR, SET_LINE_WIDTH} from '../actions';


export default function updateTool(tool, action){
    switch(action.type){
        case SET_TOOL: 
            return action.payload;
        case SET_FILL_COLOR: 
            tool.fillColor = action.payload;
            return tool;
        case SET_STROKE_COLOR: 
            tool.strokeColor = action.payload;
            return tool;
        case SET_LINE_WIDTH: 
            tool.lineWidth = action.payload;
            return tool;
        default: 
            return tool;
    }
}