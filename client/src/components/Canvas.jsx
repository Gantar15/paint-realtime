import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';

import {setCanvas, setTool, pushToUndo} from '../action-creators';
import Brush from '../tools/Brush';

import '../styles/canvas.scss';


export const Canvas = ({setCanvas, setTool, 
    pushToUndo}) => {

    const canvasRef = useRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
        setTool(new Brush(canvasRef.current));
    }, []);

    const pointerDownHandler = () => {
        pushToUndo(canvasRef.current.toDataURL());
    };

    return (
        <div className="canvas">
            <canvas onPointerDown={pointerDownHandler} ref={canvasRef} width={600} height={400}/>
        </div>
    );
};

const mapDispatchToProps = {
    setCanvas, setTool, pushToUndo
};

export default connect(null, mapDispatchToProps)(Canvas);
