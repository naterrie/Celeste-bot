const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.URI).then(() => {
	console.log('Connecté à MongoDB !');
	})
	.catch((error) => {
		console.error('Erreur de connexion à MongoDB :', error);
		process.exit(1);
});

const userSchema = new mongoose.Schema({
	DiscordId: {
		type: String,
		required: true,
		unique: true
	},
	Name: String,
	Tag: String,
	Region: String,
	Puuid: {
		type: String,
		required: true,
		unique: true
	},
	Id: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
