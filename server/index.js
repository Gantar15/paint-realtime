const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const WSServer = require('express-ws')(app);
const wsHandle = WSServer.getWss();

const PORT = process.env.POST || 5000;


app.use(cors());
app.use(express.json());

app.ws('/', (ws, req) => {
    console.log('Сокет подключен');
    ws.on('message', mess => {
        mess = JSON.parse(mess);
        switch(mess.method){
            case 'connection':
                connectionHandler(ws, mess);
                break;
            case 'draw':
            case 'stop':
                broadcastMessage(ws, JSON.stringify(mess));
                break;
        }
    });
});

app.get('/image', (req, resp) => {
    try{
        fs.readFile(path.join(__dirname, 'db', `${req.query.id}.jpeg`), 'base64', (err, data) => {
            if(err){
                throw err;
            }
            resp.status(200).json({
                dataUrl: 'data:image/png;base64,' + data.toString()
            });
        });
    } catch(err){
        console.log(err);
        resp.status(500).json('Error');
    }
});

app.post('/image', (req, resp) => {
    try{
        const data = req.body.img.replace('data:image/png;base64,', '');
        fs.writeFile(path.join(__dirname, 'db', `${req.query.id}.jpeg`), data, 'base64', err => {
            if(err){
                throw err;
            }
            resp.status(200).json({message: 'загружено'});
        });
    } catch(err){
        console.log(err);
        resp.status(500).json('Error');
    }
});

app.listen(PORT, () => {
    console.log(`Paint server was started on port ${PORT}`);
});

const connectionHandler = (ws, mess) => {
    ws.id = mess.id;
    broadcastMessage(ws, JSON.stringify(mess));
};

const broadcastMessage = (ws, mess) => {
    wsHandle.clients.forEach(clientWs => {
        if(clientWs.id === ws.id)
            clientWs.send(mess);
    });
};