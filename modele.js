const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	DiscordId: {
	type: String,
		required: true,
	unique: true
	},
	SummonerName: String,
	Tag: String,
	Region: String,
	Puuid: String,
	AccountId: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
