import React, { Component } from 'react'

import '../styles/toolbar.scss';


export class SettingBar extends Component {
    render() {
        return (
            <div className="setting-bar">
                <label htmlFor="line-width">Толщина линии</label>
                <input/>
                <label htmlFor="stroke-color">Цвет обводки</label>
                <input id="stroke-color" type="color"/>
            </div>
        )
    }
}

export default SettingBar
