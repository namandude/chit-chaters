const { Socket } = require('socket.io')

//Node server which will handle socket .io
//const io= require('socket.io')(8000) 

const io = require('socket.io')(8000, {cors: {origin: "*"}});
;
// taking cors problem fixed

//take anyport you want we take 8000 hehre
const users={}
//Event ke name custom hai like new user jooined or send recieve
io.on('connection',socket=>{
    //This part listens for a 'connection' event, which occurs when a new client connects to the Socket.IO server.
    socket.on('new-user-joined',naame=>{
        // console.log("nEW",naame);
        users[socket.id]=naame;
        socket.broadcast.emit('user-joined',naame);
        //This line sends a 'user-joined' event to all connected clients except the newly connected client. It informs other clients that a new user has joined the chat
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,naame:users[socket.id]})
    });
   
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
    })


