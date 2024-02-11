const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	DiscordId: {
	type: String,
		required: true,
	unique: true
	},
	Name: String,
	Tag: String,
	Region: String,
	Puuid: String,
	Id: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
