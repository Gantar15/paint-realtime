
import {SET_TOOL} from '../actions';


export const setCanvas = tool => {
    return {
        type: SET_TOOL,
        payload: tool
    };
}