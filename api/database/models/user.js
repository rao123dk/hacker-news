
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise
const passportLocalMongoose = require('passport-local-mongoose');


// Define userSchema
const userSchema = new Schema({
	name: { type: String, unique: false, required: true },
    password: { type: String, unique: false, required: true },
    username : { type: String, unique: true, required: true } // its emaild id
})

//userSchema.plugin(passportLocalMongoose, { usernameField : 'email' });


// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User;