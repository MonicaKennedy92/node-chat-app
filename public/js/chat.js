var socket = io();


function scrollToBottom()  {
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();
if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
  console.log('should scroll');
  messages.scrollTop(scrollHeight);
}
}
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
  // console.log('New Message',email);
  var formatedTime = moment(email.createdAt).format('h:mm a');
//   var li = jQuery('<li></li>')
//   li.text(`${email.from} ${formatedTime}: ${email.text}`)
//   jQuery('#messages').append(li);



var template = jQuery('#message-template').html();
var html = Mustache.render(template, {
  text: email.text,
  from: email.from,
  createdAt: formatedTime
});

jQuery('#messages').append(html);
scrollToBottom();
});


// socket.emit('createMessage',{
//   from:'sofi.ken@rediffmail.com',
//   text:'hey sofi'
// }, function(data) {
//   console.log('Got it',data);
// });

socket.on('newLocationMessage', function(message) {
//  var li = jQuery('<li></li>')
  var formatedTime = moment(message.createdAt).format('h:mm a');

var template = jQuery('#location-message-template').html();
var html = Mustache.render(template, {
  from:message.from,
  url:message.url,
  createdAt:formatedTime
});
jQuery('#messages').append(html);
scrollToBottom();
  // var a = jQuery('<a target="_blank">My current location</a>')
  // li.text(`${message.from} ${formatedTime}: `)
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e) {

  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from:'User',
    text: messageTextbox.val()
  },function () {
     messageTextbox.val('')
  })
})


var locationButton = jQuery('#send-location');

locationButton.on('click',function() {
if (!navigator.geolocation) {
  return alert('Geolocation not supported by your browser')
}
locationButton.attr('disabled','disabled').text('Sending location...');

navigator.geolocation.getCurrentPosition(function (position) {
  locationButton.removeAttr('disabled').text('Send location');
console.log(position);
socket.emit('createLocationMessage', {
  latitude : position.coords.latitude,
  longitude : position.coords.longitude
})
},function() {
  locationButton.removeAttr('disabled').text('Send location');

  alert('Unable to fetch location')
})
})
