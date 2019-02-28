var socket = io();
socket.on('connect', function ()  {
  console.log('Connected to server');
  // socket.emit('createEmail',{
  //   to:'moni.ken@rediffmail.com',
  //   text:'hey moni'
  // });

  // socket.emit('createMessage',{
  //   from:'sofi.ken@rediffmail.com',
  //   text:'hey sofi'
  // })
});

socket.on('disconnect', function ()  {
  console.log('Disconnected from server');
});

// socket.on('newEmail',function (email) {
//   console.log('New Email',email);
// });

socket.on('newMessage',function (email) {
  console.log('New Message',email);
});

socket.emit('createMessage',{
  from:'sofi.ken@rediffmail.com',
  text:'hey sofi'
}, function(data) {
  console.log('Got it',data);
});
