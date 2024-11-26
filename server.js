const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const socket = new WebSocket(`wss://chat-application-web-backend.onrender.com`);
// const PORT = process.env.PORT || 3000;  // Use Render's provided port
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


let clients = [];

wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);

    ws.on('message', (message) => {
        // Ensure the message is decoded to a string if it's in Buffer format
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
});

console.log('WebSocket server listening on port 8080');
