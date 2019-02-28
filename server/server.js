const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// console.log(__dirname + '/../public');
// console.log(publicPath);


var app = express();

var server = http.createServer(app);
var io = socketIO(server);


io.on('connection', (socket) => {
console.log('New user connected');
// socket.emit('newEmail', {
//   from:'monica.ria92@gmail.com',
//   text:'Hey',
//   createAt: 123
// });


// socket.emit('newMessage',{
//   from:'ria92@gmail.com',
//   text:'Hey ria',
//   createdAt: 456
// });

// socket.on('createEmail',(newEmail) => {
//   console.log('createEmail',newEmail);
// });

socket.on('createMessage',(newMessage) => {
  console.log('createMessage',newMessage);
  io.emit('newMessage',{
    from: newMessage.from,
    text:newMessage.text,
    createdAt:new Date().getTime()
  });
});
socket.on('disconnect',() => {
  console.log('User was disconnect');
})
});


app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`server is up on  ${port}`);
});
