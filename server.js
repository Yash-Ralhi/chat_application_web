const WebSocket = require('ws');

// Use the Render-provided port for the WebSocket server
const PORT = process.env.PORT || 8080;  // Use Render's port, or fallback to 8080
const wss = new WebSocket.Server({ port: PORT });

// List to store connected clients
let clients = [];

// WebSocket client to connect to an external WebSocket server
// (If needed, you can use this for communication with another WebSocket server)
const socket = new WebSocket('wss://chat-application-backend-oq9f.onrender.com');

// When the WebSocket client (socket) connects to an external server
socket.on('open', function open() {
    console.log('Connected to external WebSocket server.');
});

// Handle messages from the external WebSocket server (if needed)
socket.on('message', function incoming(data) {
    console.log('Received data from external server:', data);
    // If necessary, you can broadcast this data to your connected clients
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);  // Send the message to all connected clients
        }
    });
});

// Handle new WebSocket connections from frontend clients
wss.on('connection', (ws) => {
    console.log('New client connected');
    clients.push(ws);  // Add new client to the clients list

    // Handle incoming messages from frontend clients
    ws.on('message', (message) => {
        const decodedMessage = message.toString();  // Decode the message if it's in Buffer format
        console.log('Received message from client:', decodedMessage);
        
        // Broadcast the message to all other connected clients
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(decodedMessage);  // Send the message to other connected clients
            }
        });

        // Optionally, forward this message to the external WebSocket server (if required)
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(decodedMessage);  // Forward the message to the external server
        }
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
