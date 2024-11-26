let socket;
let username;
let messagesContainer = document.getElementById("messages");

function enterChatRoom() {
    username = document.getElementById("name").value;
    if (username) {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("chatRoom").style.display = "block";

        // Connect to WebSocket server
        // Replace this line with the URL of your deployed WebSocket server
        const socket = new WebSocket('wss://chat-application-web.onrender.com');


        socket.onopen = function() {
            console.log("Connected to the server");
        };

        socket.onmessage = function(event) {
            // Ensure the received message is a string
            let message = event.data;

            // Create a div to hold the message with the sender's name and the message
            let messageDiv = document.createElement("div");
            messageDiv.classList.add('message'); // For styling the message

            // Display message (e.g., 'yash: hello this is yash')
            messageDiv.innerHTML = message;  
            messagesContainer.appendChild(messageDiv);

            // Scroll to the bottom of the messages container to show the new message
            messagesContainer.scrollTop = messagesContainer.scrollHeight; 
        };

        socket.onclose = function() {
            console.log("Connection closed");
        };
    } else {
        alert("Please enter a name to join the chat room.");
    }
}

function sendMessage() {
    const message = document.getElementById('message').value;

    // Check if the message is not empty and socket is properly initialized
    if (message && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message); // Send the message to the WebSocket server

        // Optionally, display the message in the UI immediately
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = `You: ${message}`;
        document.getElementById('messages').appendChild(messageDiv);

        // Clear the input field after sending the message
        document.getElementById('message').value = '';
    } else {
        console.error("WebSocket is not open or not initialized.");
    }
}

