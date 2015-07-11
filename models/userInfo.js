var exports = module.exports = {};

// Dependencies
var mandrill = require('mandrill-api/mandrill');
var keys = require('./keys.js');
var User = require('./User.js');
var Amazon = require('./amazon.js');
var mandrill_client = new mandrill.Mandrill(keys.mandrill);

exports.getMandrillInfo = function (userEmail, error, success) {
  var query = {
    address: userEmail
  }

  mandrill_client.senders.info(query, function (result, err) {
      return success(result);
  }, function(e) {
      console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
      return error(e);
  });
}
