var mongoose = require('mongoose');

var EmailListSchema = mongoose.Schema({
	  emails: [String]
	, emailCount: Number
})

module.exports = mongoose.model('EmailList', EmailListSchema);