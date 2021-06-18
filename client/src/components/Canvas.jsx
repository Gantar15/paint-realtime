import React, { useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import  {Modal, Button} from "react-bootstrap";
import { useParams } from 'react-router-dom';

import {setCanvas, setTool, 
    pushToUndo, pushToRedo,
    setUsername,
    setSocket, setSessionId,
    undoAction, redoAction} from '../action-creators';
import Brush from '../tools/Brush';
import Cercle from '../tools/Cercle';
import Rect from '../tools/Rect';
import Line from '../tools/Line';
import Eraser from '../tools/Eraser';
import {saveScreen} from '../utils'; 

import '../styles/canvas.scss';


export const Canvas = ({setCanvas, setTool, 
    pushToUndo, setUsername, 
    setSocket, setSessionId,
    username, canvas,
    undoAction, redoAction,
    socket}) => {

    const canvasRef = useRef();
    const usernameRef = useRef();
    const [modal, setModal] = useState(true);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/image?id=${params.id}`, {
            method: 'get'
        }).then(resp => resp.json()).
        then(data => {
            if(data?.dataUrl){
                const img = document.createElement('img');
                img.src = data.dataUrl;
                img.onload = () => {
                    canvasRef.current.getContext('2d').
                    drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                };
                setCanvas(canvasRef.current);
            }
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
                        canvasRef.current.getContext('2d').beginPath();
                        break;
                    case 'push_to_undo':
                        pushToUndo(data.dataUrl);
                        break;
                    case 'push_to_redo':
                        pushToRedo(data.dataUrl);
                        break;
                    case 'undo':
                        undoAction();
                        break;
                    case 'redo':
                        redoAction();
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
        socket.send(JSON.stringify({
            method: 'push_to_undo',
            dataUrl: canvasRef.current.toDataURL()
        }));
    };

    const pointerUpHandler = () => {
        saveScreen(canvasRef.current, params.id);
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


const mapStateToProps = ({username, canvas, socket}) => ({username, canvas, socket});

const mapDispatchToProps = {
    setCanvas, setTool,
    pushToUndo, setUsername,
    setSocket, setSessionId,
    undoAction, redoAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
