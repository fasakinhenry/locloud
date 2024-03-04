# Websockets

This aims to show the ongoing solution to the websockets approach to allow communication between the devices

## The javascript code(server.js) updates

This shows the files for server.js

> server.js

```JavaScript
const WebSocket = require('ws'); // Import WebSocket module

const port = 8080;
const clients = new Set(); // Set to store connected clients

const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  clients.add(ws);

  console.log('Client connected');

  ws.onmessage = (message) => {
    const data = JSON.parse(message.toString());
    const { text } = data;

    console.log('Received text:', text);

    // Broadcast to all connected clients
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ text }));
      }
    });
  };

  ws.onclose = () => {
    clients.delete(ws);
    console.log('Client disconnected');
  };
});

console.log(`WebSocket server listening on port ${port}`);
```

## The javascript code(script.js) updates

This shows the files for script.js

> script.js

```JavaScript
const textArea = document.getElementById('text-area');
const generateLinkButton = document.getElementById('generate-link-button');
const textContainer = document.getElementById('text-container'); // New element
const ws = new WebSocket('ws://localhost:8080/ws'); // Connect to WebSocket endpoint

generateLinkButton.addEventListener('click', async () => {
  const text = textArea.value;

  // Check if text is entered
  if (!text) {
    textContainer.textContent = 'Please enter some text to send.';
    return;
  }

  // Send text to server via WebSocket
  ws.send(JSON.stringify({ text }));

  // Update local copy (optional)
  textContainer.textContent = text; // Update displayed text on laptop
});

ws.onmessage = (event) => {
  const newText = JSON.parse(event.data);
  textContainer.textContent = newText;
};

ws.onopen = () => {
  console.log('WebSocket connection established');
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
  textContainer.textContent = 'WebSocket error!';
};
```