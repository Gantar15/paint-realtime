import React, { useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import  {Modal, Button} from "react-bootstrap";
import { useParams } from 'react-router-dom';

import {setCanvas, setTool, 
    pushToUndo, setUsername,
    setSocket, setSessionId} from '../action-creators';
import Brush from '../tools/Brush';
import Cercle from '../tools/Cercle';
import Rect from '../tools/Rect';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';

import '../styles/canvas.scss';


export const Canvas = ({setCanvas, setTool, 
    pushToUndo, setUsername, 
    setSocket, setSessionId,
    username, canvas}) => {

    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/image?id=${params.id}`, {
            method: 'get'
        }).then(resp => resp.json()).
        then(data => {
            const img = document.createElement('img');
            img.src = data.dataUrl;
            img.onload = () => {
                canvasRef.current.getContext('2d').
                drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                setCanvas(canvasRef.current);
            };
        }).
        catch(err => {
            console.warn(err);
            setCanvas(canvasRef.current);
        });
    }, []);

    useEffect(() => {
        if(username){
            const ws = new WebSocket('ws://localhost:5000');
            setSocket(ws);
            setSessionId(params.id);
            setTool(new Brush(canvasRef.current, ws, params.id));
            ws.onopen = () => {
                ws.send(JSON.stringify({
                    method: 'connection',
                    id: params.id,
                    username
                }));
            };
            ws.onmessage = ({data}) => {
                data = JSON.parse(data);
                switch(data.method){
                    case 'connection':
                        console.log(`Пользователь ${data.username} был подключен`);
                        break;
                    case 'draw':
                        drawScreen(data);
                        break;
                    case 'stop':
                        canvas.canvas.getContext('2d').beginPath();
                        break;
                }
            };
        }
    }, [username]);

    const drawScreen = mess => {
        const {figure} = mess;
        const ctx = canvasRef.current.getContext('2d');
        switch(figure.type){
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y, figure.strokeColor, figure.lineWidth);
                break;
            case 'circle':
                Cercle.staticDraw(ctx, figure.x, figure.y, 
                    figure.radius, figure.strokeColor, figure.lineWidth);
                break;
            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height,
                    figure.strokeColor, figure.fillColor, figure.lineWidth);
                break;
            case 'line':
                Line.staticDraw(ctx, figure.x, figure.y, figure.startCoords,
                    figure.strokeColor, figure.lineWidth);
                break;
            case 'eraser':
                Eraser.staticDraw(ctx, figure.x, figure.y, figure.lineWidth);
                break;
        }
    };

    const pointerDownHandler = () => {
        pushToUndo(canvasRef.current.toDataURL());
    };

    const pointerUpHandler = () => {
        fetch(`http://localhost:5000/image?id=${params.id}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                img: canvasRef.current.toDataURL()
            })
        }).then(resp => resp.json()).
        then(data => console.log(data.message)).
        catch(err => console.warn(err));
    };

    const connectHandler = () => {
        setModal(false);
        setUsername(usernameRef.current.value);
    };

    return (
        <div className="canvas">
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header >
                    <Modal.Title>Введите ваше имя</Modal.Title>
                </Modal.Header>
                <Modal.Body className="input-block">
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => connectHandler()}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onPointerDown={pointerDownHandler} onPointerUp={pointerUpHandler} ref={canvasRef} width={600} height={400}/>
        </div>
    );
};


const mapStateToProps = ({username, canvas}) => ({username, canvas});

const mapDispatchToProps = {
    setCanvas, setTool,
    pushToUndo, setUsername,
    setSocket, setSessionId
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
