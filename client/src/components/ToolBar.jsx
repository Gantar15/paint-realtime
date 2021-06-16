import React from 'react';
import {connect} from 'react-redux'
import {setTool, setFillColor, undoAction, redoAction} from '../action-creators';

import Brush from '../tools/Brush';
import Rect from '../tools/Rect';
import Cercle from '../tools/Cercle';
import Eraser from '../tools/Eraser';
import Line from '../tools/Line';

import '../styles/toolbar.scss';


export const ToolBar = ({canvas: {canvas}, setTool, setFillColor,
    undoAction, redoAction}) => {

    return (
        <div className="toolbar">
            <button onClick={() => setTool(new Brush(canvas))} className="toolbar__btn brush"/>
            <button onClick={() => setTool(new Rect(canvas))} className="toolbar__btn rect" />
            <button onClick={() => setTool(new Cercle(canvas))} className="toolbar__btn circle" />
            <button onClick={() => setTool(new Eraser(canvas))} className="toolbar__btn eraser" />
            <button onClick={() => setTool(new Line(canvas))} className="toolbar__btn line" />
            <label htmlFor="fill-color">Цвет заливки</label>
            <input onChange={e => setFillColor(e.target.value)} id="fill-color" type="color"/>
            <button onClick={undoAction} className="toolbar__btn undo" />
            <button onClick={redoAction} className="toolbar__btn redo" />
            <button className="toolbar__btn save" />
        </div>
    );
}


const mapStateToProps = ({canvas}) => ({canvas});
const mapDispatchToProps = {
    setTool, setFillColor,
    undoAction, redoAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
