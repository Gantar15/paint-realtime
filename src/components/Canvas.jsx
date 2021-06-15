import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';

import {setCanvas} from '../action-creators';

import '../styles/canvas.scss';


export const Canvas = ({canvas, setCanvas}) => {
    const canvasRef = useRef();

    useEffect(() => {
        setCanvas(canvasRef.current);
    }, []);

    return (
        <div className="canvas">
            <canvas ref={canvasRef} width={600} height={400}/>
        </div>
    );
};

const mapStateToProps = ({canvas}) => ({canvas});
const mapDispatchToProps = {
    setCanvas
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
