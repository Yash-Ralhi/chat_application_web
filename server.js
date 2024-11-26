const WebSocket = require('ws');

// Use the Render-provided port
const PORT = process.env.PORT || 8080;  
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    // Handle messages from clients
    ws.on('message', (message) => {
        const decodedMessage = message.toString();  // Decode the message to string
        console.log('Received message:', decodedMessage);
        
        // Broadcast the message to all other clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage);
            }
        });
    });

    // Remove client from list on disconnect
    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter((client) => client !== ws);
    });
});

console.log(`WebSocket server listening on port ${PORT}`);
