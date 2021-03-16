const express =require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router'); 
const{addUser,removeUser,getUser,getUsersInRoom}=require ('./users.js');
const { isIPv4 } = require('net');
const Port =process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors:{
        origin:"http://192.168.43.206:3000",
        method:["GET","POST"]
    }
}) 

io.on('connection',(socket)=>{
console.log('we have a new connection! running')

    socket.on('join',({name,room},callback)=>{
        console.log(name,room);
        const {error,user} =  addUser({id:socket.id,name,room});
        if(error) return callback(error);
        socket.emit('massage',{user:'admin',test:user.name+',welcome to the room '+user.name});
        socket.broadcast.to(user,room).emit('massage',{user:'admin',test:user.name+',has joined!'})
        socket.join(user.room);
        io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)})
        callback();   
    });

    socket.on('sendMessage',(message,callback)=>{

     const user =getUser(socket.id);
     io.to(user.room).emit('massage',{user:user.name,text:message});
     io.to(user.room).emit('roomData',{room:user.room,users:getUsersInRoom(user.room)});
      callback();  
    });


    socket.on('disconnect',()=>{
    console.log('user had left!')});
});

app.use(router);

server.listen(Port,isIPv4,()=>
console.log('sever has started on port '+Port));
