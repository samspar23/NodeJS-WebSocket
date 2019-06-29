const express = require('express');
const app = express();
const socket = require('socket.io');
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server started on port: ' + port);
});

app.use(express.static('public'));

const io = socket(server);
io.on('connection', (socket) => {
    console.log('Made socket connection with- ' + socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });
});