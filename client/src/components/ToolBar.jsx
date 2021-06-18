import React from 'react';
import {connect} from 'react-redux'
import {setTool, setFillColor, undoAction, redoAction} from '../action-creators';
import { useParams } from 'react-router-dom';

import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Cercle from '../tools/Cercle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

import '../styles/toolbar.scss';


export const ToolBar = ({canvas: {canvas}, 
    setTool, setFillColor,
    undoAction, redoAction,
    sessionId, socket}) => {

    const params = useParams();

    const download = () => {
        const dataURL = canvas.toDataURL();
        const a = document.createElement('a');
        a.href = dataURL;
        a.download = dataURL.replace('data:image/png;base64,', '');
        document.body.append(a);
        a.click();
        a.remove();
    };

    const undo = () => {
        socket.send(JSON.stringify({
            method: 'undo'
        }));
    };

    const redo = () => {
        socket.send(JSON.stringify({
            method: 'redo'
        }));
    };

    return (
        <div className="toolbar">
            <button onClick={() => setTool(new Brush(canvas, socket, sessionId))} className="toolbar__btn brush"/>
            <button onClick={() => setTool(new Rect(canvas, socket, sessionId))} className="toolbar__btn rect" />
            <button onClick={() => setTool(new Cercle(canvas, socket, sessionId))} className="toolbar__btn circle" />
            <button onClick={() => setTool(new Eraser(canvas, socket, sessionId))} className="toolbar__btn eraser" />
            <button onClick={() => setTool(new Line(canvas, socket, sessionId))} className="toolbar__btn line" />
            <label htmlFor="fill-color">Цвет заливки</label>
            <input onChange={e => setFillColor(e.target.value)} id="fill-color" type="color"/>
            <button onClick={undo} className="toolbar__btn undo" />
            <button onClick={redo} className="toolbar__btn redo" />
            <button onClick={download} className="toolbar__btn save" />
        </div>
    );
}


const mapStateToProps = ({canvas, sessionId, socket}) => ({canvas, sessionId, socket});
const mapDispatchToProps = {
    setTool, setFillColor,
    undoAction, redoAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
