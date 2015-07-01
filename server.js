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
// app.use(bodyParser());

// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// Controllers
var MainController = require('./controllers/mainController.js');
var ListController = require('./controllers/listsController.js');

// FOR TESTING ONLY
var Amazon = require('./models/amazon.js');
Amazon.getObject();


//////////////////
// RESTful API
//////////////////

// Sending emails
app.post('/api/email', MainController.send);
// List management
app.post('/api/emailList', ListController.saveList);
app.get('/api/emailLists/:userEmail', ListController.getLists);
app.delete('/api/list/:listId', ListController.deleteList);
// Unsubscribe email
app.put('/api/unsubscribe', ListController.unsubscribe);
// User management
app.get('/api/userinfo/:userEmail', MainController.getUserInfo);
// Templates endpoints
app.get('/api/template', MainController.getTemplate);

//////////////////

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
