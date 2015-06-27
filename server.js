// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// App definition
var app = express();

// Serving app
app.use(express.static(__dirname + '/'));

// Middleware
app.use(cors());
app.use(bodyParser());

// Controllers
var Email = require('./controllers/emailController.js');

// RESTful api
app.post('/email', Email.send);
app.post('/emailList', Email.saveList);

// Connections
var mongooseUri = 'mongodb://localhost/mailpants';
mongoose.connect(mongooseUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Mongoose listening to your soul on:', mongooseUri);
});

var portNum = 3000;
app.listen(portNum, function () {
    console.log('Making some pancakes on port:', portNum);
})
