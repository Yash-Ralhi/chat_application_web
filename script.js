let socket;
let userName;

function enterChatRoom() {
    userName = document.getElementById("name").value; // Get user name from input field

    if (userName) {
        document.getElementById("nameInput").style.display = "none"; // Hide name input section
        document.getElementById("chatRoom").style.display = "block"; // Show chatroom section
        document.getElementById("welcome-text").innerText = `Welcome, ${userName}`;

        // Establish WebSocket connection
        socket = new WebSocket('https://chat-application-web.onrender.com');

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data); // Parse incoming JSON message
                displayMessage(messageData.name, messageData.message);
            } catch (err) {
                console.error("Error parsing received message:", err);
            }
        };

        socket.onclose = () => {
            console.log("Disconnected from WebSocket server");
        };

        socket.onerror = (err) => {
            console.error("WebSocket error:", err);
        };
    } else {
        alert("Please enter your name!");
    }
}

function sendMessage() {
    const messageInput = document.getElementById("message");
    const message = messageInput.value;

    if (message && socket && socket.readyState === WebSocket.OPEN) {
        const messageData = { name: userName, message }; // Include sender's name
        try {
            socket.send(JSON.stringify(messageData)); // Send the message as JSON
            displayMessage("You", message); // Display your own message
            messageInput.value = ""; // Clear the input field
        } catch (err) {
            console.error("Error sending message:", err);
        }
    } else {
        console.error("WebSocket connection is not open.");
    }
}

function displayMessage(sender, message) {
    const messagesContainer = document.getElementById("messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`; // Add sender's name
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
}
