const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http); // import server.io

// Simulate some user data 
const users = [
    { id: 1, username: "John" },
    { id: 2, username: "Paul" },
];

let messages = []; // Array to store chat messages 

app.use(express.static('public'));  // Assuming your CSS and JS files are in a 'public' folder

app.get('/css/*', (req, res) => {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'public', req.url));
});

app.get('/js/*', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'public', req.url));
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log("A user connected.");

    // Send existing messages to newly connected user
    socket.emit('messages', messages);

    socket.on('chat message', (msg) => {
        const user = users.find(u => u.id === socket.id); // Simulate finding user
        messages.push({ content: msg, user }); // Add message to history
        io.emit('chat message', { content: msg, user }); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('Server listening on port 3000');
});
