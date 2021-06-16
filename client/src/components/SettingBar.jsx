import React from 'react';
import {connect} from 'react-redux';

import {setStrokeColor, setLineWidth} from '../action-creators';

import '../styles/toolbar.scss';


export const SettingBar = ({setLineWidth, setStrokeColor}) => {
    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={ev => setLineWidth(ev.target.value)}
                id="line-width"
                type="number" defaultValue={1} min={1} max={50}/>
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input id="stroke-color" type="color" onChange={e => setStrokeColor(e.target.value)}/>
        </div>
    );
};

export default connect(null, {
    setStrokeColor, setLineWidth
})(SettingBar);
