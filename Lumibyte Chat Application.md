# **Lumibyte Chat Application** 

## **Overview**

This project is a **simplified ChatGPT-style application** built for the **Lumibyte Full Stack Assignment**.  
 It includes a responsive React frontend and a Node.js \+ Express backend providing mock conversational responses and structured tabular data.

The system supports:

* Multiple chat sessions

* Session-based chat history

* Light/Dark theme

* Like/Dislike feedback

* Dynamic tables

* Persistent mock data (in-memory)

* Sidebar navigation

---

## **Key Features**

### **🎯 Frontend (React \+ TailwindCSS)**

* Modern 2-pane layout (Sidebar \+ Chat Window)

* Fully responsive

* Clean UI with TailwindCSS

* Dark/Light theme toggle

* Sidebar with all past sessions

* “New Chat” session generator

* Chat interface similar to ChatGPT

* Structured data (tables) rendered beautifully

* Like 👍 / Dislike 👎 feedback for each assistant reply

* Auto-scroll to bottom

* Route-based session loading (`/chat/:sessionId`)

---

### **🎯 Backend (Node.js \+ Express)**

* Fully mock API (no database required)

* In-memory session storage

* REST API endpoints:

  * `/api/new-chat` – Create new chat session

  * `/api/sessions` – List all sessions

  * `/api/session/:id` – Fetch full chat history

  * `/api/chat/:id` – Add user question \+ generate mock reply

  * `/api/feedback/:id` – Like/Dislike a message

* Random structured table generator

* Clean and modular structure

---

## **Tech Stack**

### **Frontend:**

* React (CRA)

* React Router

* TailwindCSS

* JavaScript (ES6)

### **Backend:**

* Node.js

* Express.js

* CORS

* In-memory storage

---

##  

## **Folder Structure**

`chat-app/`  
`│`  
`├── backend/`  
`│   ├── server.js`  
`│   ├── mockData.js`  
`│   ├── package.json`  
`│   └── package-lock.json`  
`│`  
`└── frontend/`  
    `├── public/`  
    `│   └── index.html`  
    `├── src/`  
    `│   ├── components/`  
    `│   │   ├── Sidebar.js`  
    `│   │   ├── ChatWindow.js`  
    `│   │   ├── TableResponse.js`  
    `│   │   ├── AnswerFeedback.js`  
    `│   │   └── ThemeToggle.js`  
    `│   ├── App.js`  
    `│   ├── index.js`  
    `│   └── index.css`  
    `├── tailwind.config.js`  
    `├── postcss.config.js`  
    `├── package.json`  
    `└── package-lock.json`

---

## **API Documentation**

### **1\. GET `/api/sessions`**

Returns list of all chat sessions.

### **2\. GET `/api/new-chat`**

Creates a new session and returns `{ sessionId }`.

### **3\. GET `/api/session/:id`**

Fetch complete chat history for a session.

### **4\. POST `/api/chat/:id`**

Payload:

`{`

  `"question": "your message"`

`}`

Response includes:

* Assistant text

* Structured table

* Likes / Dislikes

### **5\. POST `/api/feedback/:id`**

Payload:

`{`

  `"messageIndex": 1,`

  `"type": "like"` 

`}`

---

## **How to Run the Project**

### **Backend Setup**

`cd backend`

`npm install`

`npm start`

Runs at: **http://localhost:5000**

---

### **Frontend Setup**

`cd frontend`

`npm install`

`npm start`

Runs at: **http://localhost:3000**

---

## **Features Checklist (As per Lumibyte Requirements)**

| Feature | Status |
| ----- | ----- |
| New Chat page | ✔️ Done |
| Left-side collapsible panel | ✔️ Done |
| List all sessions | ✔️ Done |
| Chat interface | ✔️ Done |
| Mock data from backend | ✔️ Done |
| Structured tabular data | ✔️ Done |
| Like / Dislike | ✔️ Done |
| Light / Dark mode | ✔️ Done |
| Session-based chats | ✔️ Done |
| Session history | ✔️ Done |
| URL-based routing | ✔️ Done |
| Responsive design | ✔️ Done |

---

## 

## **Deployment**

Upload frontend and backend folders to GitHub.  
 Deploy optionally using:

* Netlify (frontend)

* Render / Vercel (backend)

---

## **Author**

**Bonaboina Gowtham**  
 Full Stack Developer Trainee  
 Lumibyte Assignment

