import React, { Component } from 'react'

import '../styles/canvas.scss';


export class Canvas extends Component {
    render() {
        return (
            <div className="canvas">
                <canvas width={600} height={400}/>
            </div>
        )
    }
}

export default Canvas
