const WebSocket = require('ws');

// Use Render-provided port or default to 8080 for local development
const PORT = process.env.PORT || 8080;

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
        // Decode message if it is in Buffer format
        const decodedMessage = message.toString();
        console.log('Received message:', decodedMessage);
        
        // Broadcast the message to all clients except the sender
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

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});

console.log(`WebSocket server listening on port ${PORT}`);
