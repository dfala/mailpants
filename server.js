var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var portNum = 3000;
app.listen(portNum, function () {
	console.log('Making some pancakes on port:', portNum);
})

app.use(cors());
app.use(bodyParser());

app.use(express.static(__dirname + '/'));


app.post('/email', function (req, res) {
	message.html = req.body.html;
	// console.log(message.html);

	mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
		console.log(result);
		res.send('success sause');
	}, function(e) {
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
		res.send('error');
	});

})

// MANDRILL CRAP
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('API KEY');


var message = {
    "html": "<p style='font-size: 40px; color: red'>Sad day :(</p>",
    "text": "Example text content",
    "subject": "example subject",
    "from_email": "dnlfala@gmail.com",
    "from_name": "Daniel Falabella",
    "to": [{
            "email": "dnlfala@gmail.com",
            "name": "Daniel Falabella",
            "type": "to"
        }],
    "headers": {
        "Reply-To": "dnlfala@gmail.com"
    }
};
var async = false;
var ip_pool = "Main Pool";
var send_at = 'Wed Jun 22 2015 18:59:27 GMT-0600 (MDT)';

// WORKING!
// mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
//     console.log(result);
// }, function(e) {
//     console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
// });

