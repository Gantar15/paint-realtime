
import updateCanvas from './canvas';
import updateTool from './tool';
import {SET_USERNAME, SET_SOCKET, SET_SESSION_ID} from '../actions';

const initialState = {
    socket: null,
    sessionId: null,
    username: '',
    canvas: {
        undoList: [],
        redoList: [],
        canvas: null
    },
    tool: null
};

const updateAppState = (state, action) => {
    const {socket, sessionId, username} = state;
    const newState = {socket, sessionId, username};

    switch(action.type){
        case SET_USERNAME:
            return {
                ...newState,
                username: action.payload
            };
        case SET_SOCKET:
            return {
                ...newState,
                socket: action.payload
            };
        case SET_SESSION_ID:
            return {
                ...newState,
                sessionId: action.payload
            };
    }

    return newState;
};

const reducer = (state = initialState, action) => {
    const {canvas, tool} = state;
    return {
        ...state,
        canvas: updateCanvas(canvas, action),
        tool: updateTool(tool, action),
        ...updateAppState(state, action)
    };
};

export default reducer;