var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill(mandrill.mandrill); //QyEQ6otE9Jl5SR3uuhQSkg

// MANDRILL CRAP


// message.html = req.body.html;
// message.to = [{
//       "email": "dnlfala@gmail.com"
//     , "name": "Daniel Falabella"
//     , "type": "to"
// },{
//       "email": "yofala@gmail.com"
//     , "name": "Daniel Falabella"
//     , "type": "to"
// }],

mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
    console.log(result);
    res.send('success sause');
}, function(e) {
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    res.send('error');
});



var message = {
    "html": "<p style='font-size: 40px; color: red'>Sad day :(</p>  <a href='*|UNSUB:http://mywebsite.com/unsub|*'>Click here to unsubscribe.</a>",
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