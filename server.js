const WebSocket = require('ws');
const express = require('express');
const http = require('http');

// Create an Express app
const app = express();
const server = http.createServer(app);

// Set up the WebSocket server
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
        const decodedMessage = message.toString();
        console.log('Received message:', decodedMessage);

        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter((client) => client !== ws);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
