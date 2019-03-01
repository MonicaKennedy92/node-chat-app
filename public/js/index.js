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
  var li = jQuery('<li></li>')
  li.text(`${email.from}: ${email.text}`)
  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from:'sofi.ken@rediffmail.com',
//   text:'hey sofi'
// }, function(data) {
//   console.log('Got it',data);
// });


jQuery('#message-form').on('submit',function(e) {

  e.preventDefault();
  socket.emit('createMessage', {
    from:'User',
    text: jQuery('[name=message]').val()
  },function () {

  })
})
