const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Create an Express app
const app = express();

// Allow CORS from your Vercel frontend domain
app.use(cors({
    origin: ['http://localhost:8080', 'https://chat-application-web.onrender.com']
}));

// Serve static files (frontend)
app.use(express.static(path.join(__dirname)));

// Create an HTTP server and pass it to the WebSocket server
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

        // Broadcast the message to all clients
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

// Serve index.html for all routes (single-page app support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
