// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var keys = require('./models/keys.js');


// Auth required
var morgan        = require('morgan');
var flash 		  = require('connect-flash');
var passport 	  = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session 	  = require('express-session');


// App definition
var app = express();


// Serving app
app.use(express.static(__dirname + '/'));


// Middleware
app.use(cors());

app.use(cookieParser());
app.use(session({ 
	secret: keys.secret,
    resave: true,
    saveUninitialized: true
 })); // session secret
app.use(passport.initialize());
app.use(passport.session({})); // persistent login sessions
app.use(flash());
require('./models/passport.js')(passport);


// Expanding server capacity
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


// Controllers
var MainController = require('./controllers/mainController.js');
var ListController = require('./controllers/listsController.js');
var AmazonController = require('./controllers/AmazonController.js');
var Stripe = require('./models/stripe.js');

//RequireAuth
var requireAuth = function(req, res, next) {
   if (!req.isAuthenticated()) {
       return res.status(403).send({message: "Logged In"   }).end();
   }
   return next();
}

////////////////////////////////////
//////////// REST API //////////////
////////////////////////////////////

// Emails
app.post('/api/email', MainController.send);

// List management
app.get('/api/emailLists/:userEmail', ListController.getLists);
app.get('/api/list/:listId', ListController.getList);
app.post('/api/emailList', ListController.saveList);
app.put('/api/unsubscribe', ListController.unsubscribe);
app.put('/api/modifyList', ListController.modifyList);
app.put('/api/unsub-emails', ListController.unsubEmails);
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

// Authentication
app.post('/api/login', passport.authenticate('local-login', {
	//not working
	successRedirect: '/#/email-lists',
	failureRedirect: '/#/login',
	failureFlash : true
}));

app.post('/api/signup', passport.authenticate('local-signup', {
	//not working
	successRedirect: '/#/email-lists',
	failureRedirect: '/#/login',
	failureFlash : true
}));

app.get('/api/user', function(req, res){
	if (req.isAuthenticated()) return res.json(req.user);
	return res.status(403).end();
});



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









