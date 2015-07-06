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
var AmazonController = require('./controllers/AmazonController.js');
var Stripe = require('./models/stripe.js');



////////////////////////////////////
//////////// REST API //////////////
////////////////////////////////////

// Users
app.get('/api/user/:userEmail', MainController.getUserInfo);
app.post('/api/user', MainController.createUser);

// Emails
app.post('/api/email', MainController.send);

// List management
app.get('/api/emailLists/:userEmail', ListController.getLists);
app.post('/api/emailList', ListController.saveList);
app.put('/api/unsubscribe', ListController.unsubscribe);
app.delete('/api/list/:listId', ListController.deleteList);

// User management
app.get('/api/userinfo/:userEmail', MainController.userMandrillInfo);

// Templates endpoints
app.get('/api/template', MainController.getTemplate);

// Amazon S3
app.get('/api/image/:imageKey', AmazonController.getImage);
app.put('/api/image', AmazonController.deleteImage);
app.post('/api/newimage', AmazonController.postImage);

// Stripe
app.post('/api/payment', Stripe.makePayment);



////////////////////////////////////
////////////////////////////////////
////////////////////////////////////



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
