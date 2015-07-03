var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	  email: { type: String, required: true }
	, lists: { type: [String], default: [] }
	, images: { type: [mongoose.Schema.Types.Mixed], default: [] }
	, dateCreated: { type: Date, default: new Date() }
})

module.exports = mongoose.model('User', UserSchema);