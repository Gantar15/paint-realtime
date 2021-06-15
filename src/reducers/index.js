
import updateCanvas from './canvas';
import updateTool from './tool';


const initialState = {
    canvas: {},
    tools: {}
};

const reducer = (state = initialState, action) => {
    const {canvas, tools} = state;
    return {
        ...state,
        canvas: updateCanvas(canvas, action),
        tools: updateTool(tools, action)
    };
};

export default reducer;