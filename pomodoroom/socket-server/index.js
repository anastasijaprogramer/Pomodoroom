// socket-server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

let comments = []; // Store all comments in memory

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Frontend URL
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

let PORT = 8080;

io.on('connection', (socket) =>
{
    console.log(`User connected: ${socket.id}`);

    // Send all previous comments to the newly connected client
    socket.emit('initial_comments', comments);

    // Listen for new comments and broadcast them
    socket.on('new_comment', (comment) =>
    {
        comments.push(comment); // Add new comment to memory
        io.emit('receive_comment', comment); // Broadcast to all clients
    });

    socket.on('disconnect', () =>
    {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Start the server
server.listen(PORT, () =>
{
    console.log(`Server running at http://localhost:${PORT}`);
});
