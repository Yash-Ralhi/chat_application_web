const WebSocket = require('ws');

// Use the Render-provided port for the WebSocket server
const PORT = process.env.PORT || 8080;  // Use Render's port, or fallback to 8080
// const wss = new WebSocket.Server({ port: PORT });

// Set up the WebSocket connection for clients (Frontend connecting to the backend)
const wss = new WebSocket(`wss://chat-application-backend-oq9f.onrender.com`); // Correct URL without extra 'https://'

// List to store connected clients
let clients = [];

// Handle new WebSocket connections from clients
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);  // Add new client to the clients list

    // Handle incoming messages from clients
    ws.on('message', (message) => {
        const decodedMessage = message.toString();  // Decode the message if it's in Buffer format
        console.log('Received message:', decodedMessage);
        
        // Broadcast the message to all other clients except the sender
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage);  // Send the message to other connected clients
            }
        });
    });

    // Handle client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
        // Remove client from the list upon disconnection
        clients = clients.filter((client) => client !== ws);
    });
});

// Log the WebSocket server start
console.log(`WebSocket server listening on port ${PORT}`);
