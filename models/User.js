var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
	  email: { type: String, required: true }
	, password: { type: String, required: true }
	, lists: { type: [String], default: [] }
	, images: { type: [mongoose.Schema.Types.Mixed], default: [] }
	, stripeCustomerId: String
	, dateCreated: { type: Date, default: new Date() }
})


// methods ======================
// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);