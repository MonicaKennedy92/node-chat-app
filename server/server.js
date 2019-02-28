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
socket.on('disconnect',() => {
  console.log('User was disconnect');
})
});


app.use(express.static(publicPath));
server.listen(port, () => {
  console.log(`server is up on  ${port}`);
});
