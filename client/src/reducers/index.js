
import updateCanvas from './canvas';
import updateTool from './tool';


const initialState = {
    canvas: {
        undoList: [],
        redoList: [],
        canvas: null
    },
    tool: null
};

const reducer = (state = initialState, action) => {
    const {canvas, tool} = state;
    return {
        ...state,
        canvas: updateCanvas(canvas, action),
        tool: updateTool(tool, action)
    };
};

export default reducer;