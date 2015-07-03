var mongoose = require('mongoose');

var EmailListSchema = mongoose.Schema({
	  emails: { type: [String], default: [] }
	, unsubs: { type: [String], default: [] }
	, emailCount: { type: Number, required: true }
	, userEmail: { type: String, required: true }
	, listName: { type: String, required: true }
	// , userID: String
})

module.exports = mongoose.model('EmailList', EmailListSchema);
