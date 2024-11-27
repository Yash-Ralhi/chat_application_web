# **Real-Time Chat Application**

A simple, lightweight real-time chat application that allows multiple users to communicate in a shared chatroom. The project demonstrates a WebSocket-based implementation with a Node.js backend and a simple HTML/CSS/JavaScript frontend.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Project Structure](#project-structure)  
4. [Setup Instructions](#setup-instructions)  
   - [Backend Deployment](#backend-deployment)  
   - [Frontend Deployment](#frontend-deployment)  
5. [Usage Instructions](#usage-instructions)  
6. [Architecture Overview](#architecture-overview)  
7. [Design Choices](#design-choices)  
8. [Future Enhancements](#future-enhancements)  
9. [Links](#links)  
10. [Screenshots](#screenshots)  

---

## **Features**

- **Real-Time Messaging**: Powered by WebSockets to ensure low-latency and instant updates for users.  
- **Multi-Client Support**: Handles multiple user connections seamlessly.  
- **User-Friendly Interface**: Clean and minimal design for ease of use.  
- **Scalable Architecture**: Backend and frontend are independently deployable for scalability.  

---

## **Technologies Used**

| **Component**   | **Technology**                  |
|------------------|---------------------------------|
| Backend          | Node.js, WebSocket (`ws`)      |
| Frontend         | HTML, CSS, JavaScript          |
| Hosting          | Render (Backend), Vercel (Frontend) |

---

## **Project Structure**

```plaintext
|-- server.js           # WebSocket server
|-- index.html          # Frontend UI (HTML)
|-- styles.css          # Frontend styles (CSS)
|-- client.js           # Frontend logic (JavaScript)
|-- README.md           # Documentation

```
---
## Setup Instructions
**1. Backend Deployment**
**Push to Github:**
1. Create a GitHub repository and push your project files.

**Deploy on Render:**

1. Log in to Render (https://render.com).
2. Create a new Web Service and link your GitHub repository.
3. Use the following configurations:
    * Build Command: `npm install`
    * Start Command: `node server.js`
4. Deploy the service. Note the backend URL (e.g., https://chat-application-web.onrender.com).
5. Update the WebSocket connection URL in `client.js`:

```javascript
const socket = new WebSocket(`wss://chat-application-web.onrender.com`);
```

**2. Frontend Deployment**
**Push to Github:**
1. Push your front-end files (index.html, styles.css, and client.js) to a separate repository.

**Deploy on Vercel:**

1. Log in to Vercel (https://vercel.com).
2. Add a new project and link the front-end repository.
3. Deploy the project. Note the front-end URL (e.g., https://chat-application-web-frontend.vercel.app/).
   
**Usage Instructions**
1. Access the Application:
   *Open the front-end URL (e.g., https://chat-application-web-frontend.vercel.app/) in a browser.
2. Join the Chat:
   *Type your message in the input field and click "Send" or press Enter.
3. Real-Time Interaction:
   *Open multiple tabs or share the link with others to test real-time messaging.
---
## Architecture
### Backend:
   * The WebSocket server handles multiple client connections using Node.js and broadcasts messages to all clients except the sender.

### Frontend:
* The front-end connects to the WebSocket server using JavaScript and updates the UI in real time with incoming messages.

### Concurrency Handling:
* The ws library in Node.js efficiently handles multiple connections and broadcasts messages using event-driven programming.
---
## Design Choices
* WebSocket Protocol: Chosen for its low latency and bidirectional communication, essential for real-time chat.
* Independent Deployments: Decoupled front-end and back-end for scalability and flexibility.
* Minimal Dependencies: Avoided external libraries for the front-end, except for the WebSocket implementation.

---
## Future Enhancements
* Add user authentication.
* Implement private messaging.
* Show a list of online users.
* Add message timestamps.

---
## Links
* Frontend Deployment: https://chat-application-web-frontend.vercel.app/
* Backend Deployment: https://chat-application-web.onrender.com

---
## Screenshots
* Home
  - ![{DBC26769-10A8-4BF4-BEEF-E4F8270E9622}](https://github.com/user-attachments/assets/45f9d912-8cbf-4400-b118-70b73e9f834b)
* Entering in the chatroom
  - ![image](https://github.com/user-attachments/assets/d8dd22fd-a911-4644-8fd7-de13045b519a)
* Sending message
  - ![{97091A5B-1C22-44C1-8934-E5D35DF69F1C}](https://github.com/user-attachments/assets/567e3656-82a0-49bf-80a5-a81ff0891e0f)
* Displaying message from first user
  - ![{10B30243-F220-4AE7-82EC-398F5F452D84}](https://github.com/user-attachments/assets/2ca629a8-dcf8-4bb0-ab80-d1ad856b2df2)
* Second user entering in the chatroom
  - ![{3EC46A68-4585-410C-BC8D-5ABD72474126}](https://github.com/user-attachments/assets/9bc715d2-4c5f-4426-a402-cf2457b3d312)
* Second user sending message
  - ![{B125ABA4-D1EB-43DC-B13F-2749C871BF28}](https://github.com/user-attachments/assets/11873214-5488-49ac-b1a0-7422db736353)
* Displaying message on the first user's interface
  - ![{E0087574-DD1D-4785-9AAB-3FF149C7A6FE}](https://github.com/user-attachments/assets/279a6a77-7ea7-495a-86c9-594c2e681222)
* Final interface of communication
  - ![{480E4DC2-4826-4394-A69F-7D2338E7A5B3}](https://github.com/user-attachments/assets/376e9e8f-f0b1-4c1e-b4e6-ea14b9a1d566)
 ![{55204BBA-1C4C-4F78-942D-40E2846CACDF}](https://github.com/user-attachments/assets/a8d3d591-55ee-4a0c-88a3-78f6ea8f0c9f)

* Backend timeline
  - ![{4570BE8C-013E-43CA-89C2-FD54063D1BDD}](https://github.com/user-attachments/assets/02564ebf-8b75-4924-9412-e8db228b1228)








