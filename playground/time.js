
var moment = require('moment');
// var date = new Date();
// var months = ['Jan', 'Feb']
// console.log(date.getMonth());


var date = moment();
date.add(100,'year').subtract(9,'months');
console.log(date.format('MMM Do, YYYY'));

new Date().getTime()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
var createdAt = 1234
var time = moment(createdAt);
console.log(time.format('h:mm a'));
