var exports = module.exports = {};

// Dependencies
var mandrill = require('mandrill-api/mandrill');
var keys = require('./keys.js');
var mandrill_client = new mandrill.Mandrill(keys.mandrill);

// Heavy lifting
exports.sendEmail = function (body, err, success) {
    if (!body.html && !body.subject) return err();

    message.html = body.html;
    message.subject = body.subject;
    message.to = body.to;

    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
        success(result)
    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        err();
    });
}

var message = {
    "text": "Example text content",
    "subject": "example subject",
    "from_email": "dnlfala@gmail.com",
    "from_name": "Daniel Falabella",
    "headers": {
        "Reply-To": "dnlfala@gmail.com"
    }
};
var async = false;
var ip_pool = "Main Pool";






// Example basic message structure

// var message = {
//     "html": "<p style='font-size: 40px; color: red'>Sad day :(</p>  <a href='*|UNSUB:http://mywebsite.com/unsub|*'>Click here to unsubscribe.</a>",
//     "text": "Example text content",
//     "subject": "example subject",
//     "from_email": "dnlfala@gmail.com",
//     "from_name": "Daniel Falabella",
//     "to": [{
//             "email": "yofala@gmail.com",
//             "name": "Daniel Falabella",
//             "type": "to"
//         }],
//     "headers": {
//         "Reply-To": "dnlfala@gmail.com"
//     }
// };