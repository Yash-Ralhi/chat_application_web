let socket;
let username;
let messagesContainer = document.getElementById("messages");

function enterChatRoom() {
    username = document.getElementById("name").value;
    if (username) {
        document.getElementById("nameInput").style.display = "none";
        document.getElementById("chatRoom").style.display = "block";

        // Connect to WebSocket server
        socket = new WebSocket("ws://localhost:8080");

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
    let message = document.getElementById("message").value;
    if (message && socket.readyState === WebSocket.OPEN) {
        // Send the message to the server prefixed with the username
        socket.send(username + ": " + message);

        // Optionally, display the message on the current client's screen immediately
        let messageDiv = document.createElement("div");
        messageDiv.classList.add('message');
        messageDiv.innerHTML = username + ": " + message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll

        // Clear the input field after sending the message
        document.getElementById("message").value = '';
    }
}
