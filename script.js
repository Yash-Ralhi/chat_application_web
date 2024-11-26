// WebSocket connection to the server
let socket;

function enterChatRoom() {
    const name = document.getElementById("name").value;
    if (name) {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("chatRoom").style.display = "block";
        document.getElementById("welcome-text").innerText = `Welcome, ${name}`;

        // Establish WebSocket connection
        socket = new WebSocket('https://chat-application-web.onrender.com'); // Use the appropriate WebSocket URL

        socket.onopen = () => {
            console.log("Connected to the server");
        };

        socket.onmessage = (event) => {
            const message = event.data;
            displayMessage(message);
        };

        socket.onclose = () => {
            console.log("Disconnected from the server");
        };
    }
}

function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value;
    
    if (message && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        messageInput.value = "";  // Clear the message input field
        displayMessage(`You: ${message}`);  // Display your message in the chat
    }
}

function displayMessage(message) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  // Scroll to the bottom
}
