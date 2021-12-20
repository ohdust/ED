//const { addMessage } = require('../controller/chat.controller');
const express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    { Server } = require('socket.io'),  
    io = new Server(server, {
        cors: {
            origin: process.env.CORS,
            methods: ["GET", "POST"]
        }
    });
   
io.on('connection', (socket) => {
    console.log(`client connected`);
    
    
    socket.on('join-room', ({name, roomId, login}) => {

        socket.join(roomId);
        
        io.to(roomId).emit('message', {
            login: "bot", 
            message:`message:a user: ${login} joined the ${name}`});
    });
    
    socket.on('message', (roomId, message) =>{
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
