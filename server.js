const express = require("express");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

// Create an Express app
const app = express();

// Allow CORS for frontend access
app.use(
    cors({
        origin: ["http://localhost:8080", "https://chat-application-web-frontend.vercel.app/"],
    })
);

// Serve static files for frontend (if needed)
app.use(express.static(__dirname));

// Create an HTTP server and pass it to the WebSocket server
const server = http.createServer(app);

// Set up the WebSocket server
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
    console.log("New client connected");
    clients.push(ws);

    ws.on("message", (message) => {
        try {
            const messageData = JSON.parse(message.toString()); // Parse incoming JSON
            console.log("Received message:", messageData);

            // Broadcast the message to all clients
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(messageData)); // Send JSON back to clients
                }
            });
        } catch (err) {
            console.error("Error parsing message:", err);
        }
    });

    ws.on("close", () => {
        console.log("Client disconnected");
        clients = clients.filter((client) => client !== ws);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`WebSocket server listening on port ${PORT}`);
});
