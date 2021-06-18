
import {SET_USERNAME, SET_SESSION_ID, SET_SOCKET} from '../actions';

export * from './canvasActions';
export * from './toolActions';

export const setUsername = username => {
    return {
        type: SET_USERNAME,
        payload: username
    };
};

export const setSocket = socket => {
    return {
        type: SET_SOCKET,
        payload: socket
    };
};

export const setSessionId = id => {
    return {
        type: SET_SESSION_ID,
        payload: id
    };
};