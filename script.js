let socket;
let userName;

function enterChatRoom() {
    userName = document.getElementById("name").value;

    if (userName) {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("chatRoom").style.display = "block";
        document.getElementById("welcome-text").innerText = `Welcome, ${userName}`;

        socket = new WebSocket('https://chat-application-web.onrender.com');

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                // Display message only if it's not from the current user
                if (messageData.name !== userName) {
                    displayMessage(messageData.name, messageData.message);
                }
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
        const messageData = { name: userName, message };
        try {
            socket.send(JSON.stringify(messageData));
            displayMessage("You", message); // Display your message immediately
            messageInput.value = "";
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
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
