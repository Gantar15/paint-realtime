
import {SET_TOOL, SET_FILL_COLOR, 
    SET_STROKE_COLOR, SET_LINE_WIDTH} from '../actions';


export const setTool = tool => {
    return {
        type: SET_TOOL,
        payload: tool
    };
}

export const setFillColor = color => {
    return {
        type: SET_FILL_COLOR,
        payload: color
    }
};

export const setStrokeColor = color => {
    return {
        type: SET_STROKE_COLOR,
        payload: color
    }
};

export const setLineWidth = width => {
    return {
        type: SET_LINE_WIDTH,
        payload: width
    }
};