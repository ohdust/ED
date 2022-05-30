const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    { Server } = require('socket.io'),
    io = new Server(server, {
        allowEIO3: true,
        cors: {
            origin: '*',
            methods: ["GET", "POST"],
            credentials: true
        }
    });
const { addMessage } = require('../controller/chat.controller');
const validator = require('../middleware/dataValidator');

io.on('connection', (socket) => {
    console.log(`client connected`);
    
    
    socket.on('join-room', ({name, roomId, login}) => {

        socket.join(roomId);
        
        io.to(roomId).emit('message', {
            login: "bot", 
            message:`message:a user: ${login} joined the ${name}`});
    });
    
    socket.on('message', async (roomId, message) =>{
        if(validator.isString(roomId, message) === false) throw new Error('data not a string');
        await addMessage(roomId, message);
        io.to(roomId).emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        io.emit('message', {login: "bot", message:'a user left the chat'});
    });
});

module.exports = {
    app,
    express,
    server,
};
