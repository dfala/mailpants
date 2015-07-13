var exports = module.exports = {};

// Dependencies
var mandrill = require('mandrill-api/mandrill');
var keys = require('./keys.js');
var User = require('./User.js');
var mandrill_client = new mandrill.Mandrill(keys.mandrill);

// Heavy lifting
exports.sendEmail = function (body, err, success) {
    if (!body.html && !body.subject) return err();

    message.html = body.html;
    message.subject = body.subject;
    message.to = body.to;
    message.from_email = body.from_email;
    message.headers = {
        'Reply-To': body.from_email
    }

    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        console.log(result);
        User.findOne({ 'email' : body.from_email }, function (err, foundUser) {
            if (err) return res.status(500).send(err);

            // updating emails left
            foundUser.payment.emailsLeft = foundUser.payment.emailsLeft - body.to.length;
            foundUser.payment.emailsSent = foundUser.payment.emailsSent + body.to.length;

            foundUser.save(function (err, result) {
                if (err) return res.status(500).send(err);
                // return res.send('Emails sent successfully');
            })

        })

    }, function(e) {
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        err();
    });

    // success here in case too many emails are being sent
    success('Emails are in queue');
}

var message = {
    "text": "Fallback text content -- email body not sent correctly",
    "from_name": "Daniel Falabella",
};
var async = true;
var ip_pool = "Main Pool";
