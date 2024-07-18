const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();
const dbConnect = require("./dbConnect");
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const userGroupRoutes = require('./routes/userGroupRoutes');
const tabRoutes = require('./routes/tabRoutes');
const contentRoutes = require('./routes/contentRoutes');
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3003',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);
app.use('/userGroups', userGroupRoutes);
app.use('/tabs', tabRoutes);
app.use('/content', contentRoutes);


// Create a socket connection for chat tabs
io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });

    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User left room: ${room}`);
    })

    socket.on('message', ({ room, message }) => {
        socket.to(room).emit('message', message);
    });
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});